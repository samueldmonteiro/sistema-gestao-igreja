<?php

namespace App\UseCase\CongregationOffering;

use App\Contract\Repository\CongregationOfferingRepositoryInterface;
use App\Contract\Repository\CongregationRepositoryInterface;
use App\Util\ValidateGenericData;
use Samueldmonteiro\Result\Error;
use Samueldmonteiro\Result\Result;
use Samueldmonteiro\Result\Success;

class DeleteCongregationOffering
{
    public function __construct(
        private CongregationOfferingRepositoryInterface $congregationOfferingRepository,
        private CongregationRepositoryInterface $congregationRepository,
        private ValidateGenericData $validate
    ) {}
    /**
     * @return Result<true>
     */
    public function execute(int $id): Result
    {
        $congregationOffering = $this->congregationOfferingRepository->findById($id);
        if(!$congregationOffering){
            return new Error('Erro ao deletar, oferta não encontrada', 404);
        }

        $this->congregationOfferingRepository->delete($congregationOffering);
        return new Success(true);
    }
}

