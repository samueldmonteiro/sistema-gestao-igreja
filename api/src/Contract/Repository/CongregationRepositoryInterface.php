<?php

namespace App\Contract\Repository;

use App\Entity\Congregation;

interface CongregationRepositoryInterface
{
    public function save(Congregation $congregation): void;
    public function findByName(string $name): ?Congregation;
    public function findById(int $id): ?Congregation;
    public function getAll(): array;

}
