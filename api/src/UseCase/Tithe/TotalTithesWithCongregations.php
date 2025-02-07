<?php

namespace App\UseCase\Tithe;

use App\Contract\Repository\TitheRepositoryInterface;
use Samueldmonteiro\Result\Error;
use Samueldmonteiro\Result\Result;
use Samueldmonteiro\Result\Success;

class TotalTithesWithCongregations
{
    public function __construct(
        private TitheRepositoryInterface $titheRepository,
    ) {}

    public function execute(): array
    {
        return $this->titheRepository->getTotalWithCongregations();
    }
}
