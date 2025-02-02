<?php

namespace App\UseCase\Tithe;

use App\Contract\Repository\CongregationRepositoryInterface;
use App\Contract\Repository\TitheRepositoryInterface;

class GetTithes
{
    public function __construct(
        private TitheRepositoryInterface $titheRepository,
    ) {}

    public function execute(array $params)
    {
        $filters = [
            'value' => $params['value'] ?? null,
            'date' => $params['date'] ?? null,
            'congregationId' => $params['congregationId'] ?? null,
            'memberName' => $params['memberName'] ?? null
        ];

        return $this->titheRepository->getByFilters($filters);
    }
}
