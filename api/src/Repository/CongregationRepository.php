<?php

namespace App\Repository;

use App\Contract\Repository\CongregationRepositoryInterface;
use App\Entity\Congregation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Congregation>
 */
class CongregationRepository extends ServiceEntityRepository implements CongregationRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Congregation::class);
    }

    public function findByName(string $name): ?Congregation
    {
        return $this->findOneBy(['name' => $name]);
    }

    public function findById(int $id): ?Congregation
    {
        return $this->findOneBy(['id' => $id]);
    }

    public function getAll(): array
    {
        return $this->findAll();
    }

    public function save(Congregation $congregation): void
    {
        $this->getEntityManager()->persist($congregation);
        $this->getEntityManager()->flush();
    }

    public function findAllWithTithesSum(?int $limit = null): array
    {
        $entityManager = $this->getEntityManager();

        $dql = "
            SELECT 
                c.id, 
                c.name, 
                c.town, 
                SUM(t.value) AS totalTithes
            FROM 
                App\Entity\Congregation c
            LEFT JOIN 
                c.tithes t
            GROUP BY 
                c.id
            ORDER BY 
                totalTithes DESC
        ";

        if (!$limit) {
            return $entityManager->createQuery($dql)
                ->getResult();
        }

        return $entityManager->createQuery($dql)
            ->setMaxResults($limit)
            ->getResult();
    }

    public function delete(Congregation $congregation): void
    {
        $this->getEntityManager()->remove($congregation);
        $this->getEntityManager()->flush();
    }
}
