<?php

namespace App\UseCase\CongregationOffering;

use App\Contract\Repository\CongregationOfferingRepositoryInterface;

class GetCongregationOfferings
{
    public function __construct(
        private CongregationOfferingRepositoryInterface $congregationOfferingRepository,
    ) {}
   
    
    public function execute(array $params): array
    {
        $filters = [
            'congregation' => $params['congregationId'] ?? null,
            'startDate' => $params['startDate'] ?? null,
            'endDate' => $params['endDate'] ?? null,
            'monthYear' => $params['monthYear'] ?? null,
        ];

        return $this->congregationOfferingRepository->getByFilters($filters);
    }
}
