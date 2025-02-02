<?php

namespace App\Repository;

use App\Contract\Repository\TitheRepositoryInterface;
use App\Entity\Tithe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Tithe>
 */
class TitheRepository extends ServiceEntityRepository implements TitheRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tithe::class);
    }

    public function save(Tithe $tithe): void
    {
        $this->getEntityManager()->persist($tithe);
        $this->getEntityManager()->flush();
    }

    public function getByFilters(array $filters): array
    {
        $qb = $this->createQueryBuilder('t')
            ->innerJoin('t.theMember', 'm')
            ->innerJoin('t.congregation', 'c');


        if ($filters['memberName']) {
            $qb->andWhere('LOWER(m.fullName) LIKE LOWER(:memberName)')
                ->setParameter('memberName', '%' . $filters['memberName'] . '%');
        }

        if ($filters['congregationId']) {
            $qb->andWhere('c.id = :congregationId')
                ->setParameter('congregationId', $filters['congregationId']);
        }


        if (!empty($filters['date'])) {
            $qb->andWhere('t.date = :date')
                ->setParameter('date', $filters['date']);
        }

        /** 
        if (!empty($filters['date'])) {
            $qb->andWhere('t.date BETWEEN :startDate AND :endDate')
                ->setParameter('startDate', $filters['date'])
                ->setParameter('endDate', new \DateTime()); // Data atual
        }**/

        return $qb->getQuery()->getResult();
    }
}
