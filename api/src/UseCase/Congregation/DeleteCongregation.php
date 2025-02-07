<?php

namespace App\UseCase\Congregation;

use App\Contract\Repository\CongregationRepositoryInterface;
use Samueldmonteiro\Result\Error;
use Samueldmonteiro\Result\Result;
use Samueldmonteiro\Result\Success;

class DeleteCongregation
{
    public function __construct(
        private CongregationRepositoryInterface $congregationRepository,
    ) {}

    /**
     * @return Result<true>
     */    
    public function execute(int $id): Result
    {
        $congregation = $this->congregationRepository->findById($id);

        if(!$congregation){
            return new Error('Congregação não encontrada', 404);
        }

        $this->congregationRepository->delete($congregation);
        return new Success(true);
    }
}
