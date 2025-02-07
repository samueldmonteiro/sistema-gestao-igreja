<?php

namespace App\UseCase\CongregationOffering;

use App\Contract\Repository\CongregationOfferingRepositoryInterface;
use App\Contract\Repository\CongregationRepositoryInterface;

class TotalCongregationOfferings
{
    public function __construct(
        private CongregationOfferingRepositoryInterface $congregationOfferingRepository,
        private CongregationRepositoryInterface $congregationRepository,
    ) {}

    public function execute(array $params): array
    {
        return $this->congregationOfferingRepository->getTotalWithCongregation();
        
    }
}
