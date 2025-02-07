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

    public function findById(int $id): ?Tithe
    {
        return $this->findOneBy(['id' => $id]);
    }

    public function getByFilters(array $filters): array
    {
        $qb = $this->createQueryBuilder('t')
            ->leftJoin('t.theMember', 'm')  // Alterado para LEFT JOIN
            ->leftJoin('t.congregation', 'c'); 

        if ($filters['memberName']) {
            $qb->andWhere('LOWER(m.fullName) LIKE LOWER(:memberName)')
                ->setParameter('memberName', '%' . $filters['memberName'] . '%');
        }

        if ($filters['congregationId']) {
            $qb->andWhere('c.id = :congregationId')
                ->setParameter('congregationId', $filters['congregationId']);
        }

        if (!empty($filters['startDate'])) {
            $qb->andWhere('t.date >= :startDate')
                ->setParameter('startDate', new \DateTime($filters['startDate']));
        }

        if (!empty($filters['endDate'])) {
            $qb->andWhere('t.date <= :endDate')
                ->setParameter('endDate', new \DateTime($filters['endDate']));
        }

        return $qb->orderBy('t.id', 'DESC')->getQuery()->getResult();
    }

    public function delete(Tithe $tithe): void
    {
        $this->getEntityManager()->remove($tithe);
        $this->getEntityManager()->flush();
    }
}
