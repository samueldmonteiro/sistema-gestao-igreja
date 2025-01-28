<?php

namespace App\Contract\Repository;

use App\Entity\Admin;

interface AdminRepositoryInterface
{
    public function save(Admin $admin): void;
    public function findByEmail(string $email): ?Admin;
}
