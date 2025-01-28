<?php

namespace App\Contract\Repository;

use App\Entity\Member;

interface MemberRepositoryInterface
{
    public function findByName(string $name): ?Member;
    public function save(Member $member): void;
    public function getAll(): array;
    public function findByFilters(array $filters): array;

}
