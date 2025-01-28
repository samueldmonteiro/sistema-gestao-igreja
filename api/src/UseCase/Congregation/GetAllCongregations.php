<?php

namespace App\UseCase\Congregation;

use App\Contract\Repository\CongregationRepositoryInterface;

class GetAllCongregations
{
    public function __construct(
        private CongregationRepositoryInterface $congregationRepository
    ) {}

    public function execute(): array
    {
        return $this->congregationRepository->getAll();
    }
        
}
