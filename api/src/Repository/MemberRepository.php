<?php

namespace App\Repository;

use App\Contract\Repository\MemberRepositoryInterface;
use App\Entity\Member;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Member>
 */
class MemberRepository extends ServiceEntityRepository implements MemberRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Member::class);
    }

    public function getAll(?int $limit = null): array
    {
        if (!$limit) {
            return $this->findAll();
        }

        return $this->createQueryBuilder('entity')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function findById(int $id): ?Member
    {
        return $this->findOneBy(['id' => $id]);
    }

    public function findByFilters(array $filters): array
    {
        $qb = $this->createQueryBuilder('m'); // 'm' é o alias da entidade

        if (!empty($filters['name'])) {
            $qb->andWhere('m.fullName LIKE :name')
                ->setParameter('name', '%' . $filters['name'] . '%');
        }

        if (!empty($filters['congregation'])) {
            $qb->andWhere('m.congregation = :congregation')
                ->setParameter('congregation', $filters['congregation']);
        }

        if (!empty($filters['onlyTithers'])) {
            $qb->andWhere('m.isTither = :onlyTithers')
                ->setParameter('onlyTithers', $filters['onlyTithers']);
        }

        if (!empty($filters['isBaptizedWater'])) {
            $qb->andWhere('m.isBaptizedInWater = :isBaptizedWater')
                ->setParameter('isBaptizedWater', $filters['isBaptizedWater']);
        }

        if (!empty($filters['isBaptizedSpirit'])) {
            $qb->andWhere('m.isBaptizedInHolySpirit = :isBaptizedSpirit')
                ->setParameter('isBaptizedSpirit', $filters['isBaptizedSpirit']);
        }

        if (!empty($filters['registrationDate'])) {
            $qb->andWhere('m.createdAt BETWEEN :startDate AND :endDate')
                ->setParameter('startDate', $filters['registrationDate'])
                ->setParameter('endDate', new \DateTime()); // Data atual
        }

        if (!empty($filters['birthDate'])) {
            $qb->andWhere('m.birthDate = :birthDate')
                ->setParameter('birthDate', $filters['birthDate']);
        }

        return $qb->getQuery()->getResult();
    }
    public function findByName(string $name): ?Member
    {
        return $this->findOneBy(['fullName' => $name]);
    }

    public function save(Member $member): void
    {
        $this->getEntityManager()->persist($member);
        $this->getEntityManager()->flush();
    }

    public function delete(Member $member): void
    {
        $this->getEntityManager()->remove($member);
        $this->getEntityManager()->flush();
    }
}
