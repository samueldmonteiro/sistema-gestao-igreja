<?php

namespace App\Repository;

use App\Contract\Repository\AdminRepositoryInterface;
use App\Entity\Admin;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Admin>
 */
class AdminRepository extends ServiceEntityRepository implements AdminRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Admin::class);
    }

    public function save(Admin $admin): void
    {
        $this->getEntityManager()->persist($admin);
        $this->getEntityManager()->flush();
    }

    public function findByEmail(string $email): ?Admin
    {
        return $this->findOneBy(['email' => $email]);
    }
}
