<?php

namespace App\UseCase\Tithe;

use App\Contract\Repository\TitheRepositoryInterface;
use Samueldmonteiro\Result\Error;
use Samueldmonteiro\Result\Result;
use Samueldmonteiro\Result\Success;

class DeleteTithe
{
    public function __construct(
        private TitheRepositoryInterface $titheRepository,
    ) {}

    /**
     * @return Result<true>
     */
    public function execute(int $id): Result
    {
        $tithe = $this->titheRepository->findById($id);

        if (!$tithe) {
            return new Error('Dízimo inexistente', 404);
        }

        $this->titheRepository->delete($tithe);
        return new Success(true);
    }
}
