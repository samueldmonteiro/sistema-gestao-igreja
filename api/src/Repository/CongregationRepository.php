<?php

namespace App\Repository;

use App\Entity\Congregation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Congregation>
 */
class CongregationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Congregation::class);
    }

    public function findByName(string $name): ?Congregation
    {
        return $this->findOneBy(['name' => $name]);
    }

    public function save(Congregation $congregation): void
    {
        $this->getEntityManager()->persist($congregation);
        $this->getEntityManager()->flush();
    }
}
