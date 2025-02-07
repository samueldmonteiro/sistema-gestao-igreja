<?php

namespace App\Repository;

use App\Contract\Repository\CongregationOfferingRepositoryInterface;
use App\Entity\CongregationOffering;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CongregationOffering>
 */
class CongregationOfferingRepository extends ServiceEntityRepository implements CongregationOfferingRepositoryInterface
{
  public function __construct(ManagerRegistry $registry)
  {
    parent::__construct($registry, CongregationOffering::class);
  }
  public function findById(int $id): ?CongregationOffering
  {
    return $this->find($id);
  }

  public function getTotalWithCongregation(): array
  {
    return $this->createQueryBuilder('o')
      ->select('c.id, c.name, SUM(o.value) AS total_offerings')
      ->join('o.congregation', 'c')
      ->groupBy('c.id')
      ->getQuery()
      ->getResult();
  }

  public function getByFilters(array $filters): array
  {
    $qb = $this->createQueryBuilder('co');

    if (!empty($filters['congregation'])) {
      $qb->andWhere('co.congregation = :congregation')
        ->setParameter('congregation', $filters['congregation']);
    }

    if (!empty($filters['startDate'])) {
      $qb->andWhere('co.date >= :startDate')
        ->setParameter('startDate', new \DateTime($filters['startDate']));
    }

    if (!empty($filters['endDate'])) {
      $qb->andWhere('co.date <= :endDate')
        ->setParameter('endDate', new \DateTime($filters['endDate']));
    }

    if (!empty($filters['monthYear'])) {
      list($year, $month) = explode('-', $filters['monthYear']);

      $startDate = new \DateTime("$year-$month-01");

      $endDate = clone $startDate;
      $endDate->modify('first day of next month');

      $qb->andWhere('co.date >= :startDate')
        ->andWhere('co.date < :endDate')
        ->setParameter('startDate', $startDate->format('Y-m-d'))
        ->setParameter('endDate', $endDate->format('Y-m-d'));
    }

    return $qb->orderBy('co.id', 'DESC')->getQuery()->getResult();
  }

  public function save(CongregationOffering $congregationOffering): void
  {
    $this->getEntityManager()->persist($congregationOffering);
    $this->getEntityManager()->flush();
  }

  public function delete(CongregationOffering $congregationOffering): void
  {
    $this->getEntityManager()->remove($congregationOffering);
    $this->getEntityManager()->flush();
  }
}
