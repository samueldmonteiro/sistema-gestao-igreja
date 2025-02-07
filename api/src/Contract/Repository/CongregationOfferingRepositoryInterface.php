<?php

namespace App\Contract\Repository;

use App\Entity\CongregationOffering;

interface CongregationOfferingRepositoryInterface
{
    public function save(CongregationOffering $congregationOffering): void;
    public function findById(int $id): ?CongregationOffering;
    public function delete(CongregationOffering $congregationOffering): void;
    public function getByFilters(array $filters): array;
    public function getTotalWithCongregation(): array;

}
