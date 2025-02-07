<?php

namespace App\UseCase\Tithe;

use App\Contract\Repository\TitheRepositoryInterface;

class GetTithes
{
    public function __construct(
        private TitheRepositoryInterface $titheRepository,
    ) {}

    public function execute(array $params): array
    {
        $filters = [
            'value' => $params['value'] ?? null,
            'congregationId' => $params['congregationId'] ?? null,
            'memberName' => $params['memberName'] ?? null,
            'startDate' => $params['startDate'] ?? null,
            'endDate' => $params['endDate'] ?? null,
        ];

        return $this->titheRepository->getByFilters($filters);
    }
}
