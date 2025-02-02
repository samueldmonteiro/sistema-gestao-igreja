<?php

namespace App\Contract\Repository;

use App\Entity\Tithe;

interface TitheRepositoryInterface
{
    public function save(Tithe $tithe): void;
    public function getByFilters(array $filters): array;
}
