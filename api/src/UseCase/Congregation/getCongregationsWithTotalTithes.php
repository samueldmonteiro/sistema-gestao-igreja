<?php

namespace App\UseCase\Congregation;

use App\Contract\Repository\CongregationRepositoryInterface;


class getCongregationsWithTotalTithes
{
    public function __construct(
        private CongregationRepositoryInterface $congregationRepository
    ) {}

    public function execute(?int $limit = null): array
    {
        return $this->congregationRepository->findAllWithTithesSum($limit);
    }
}
