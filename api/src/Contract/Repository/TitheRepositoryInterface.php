<?php

namespace App\Contract\Repository;

use App\Entity\Tithe;

interface TitheRepositoryInterface
{
    public function save(Tithe $tithe): void;
    public function getByFilters(array $filters): array;
    public function delete(Tithe $tithe): void;
    public function findById(int $id): ?Tithe;
}
