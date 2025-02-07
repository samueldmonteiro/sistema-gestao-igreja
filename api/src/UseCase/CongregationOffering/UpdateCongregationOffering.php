<?php

namespace App\UseCase\CongregationOffering;

use App\Contract\Repository\CongregationOfferingRepositoryInterface;
use App\Contract\Repository\CongregationRepositoryInterface;
use App\Entity\CongregationOffering;
use App\Util\ValidateGenericData;
use DateTimeImmutable;
use Samueldmonteiro\Result\Error;
use Samueldmonteiro\Result\Result;
use Samueldmonteiro\Result\Success;

class UpdateCongregationOffering
{
    public function __construct(
        private CongregationOfferingRepositoryInterface $congregationOfferingRepository,
        private CongregationRepositoryInterface $congregationRepository,
        private ValidateGenericData $validate
    ) {}

    /**
     * @return Result<CongregationOffering>
     */
    public function execute(int $id, array $data): Result
    {
        $validateInput = $this->validateInput($data);
        if ($validateInput->isError()) {
            return $validateInput;
        }

        $congregationOffering = $this->congregationOfferingRepository->findById($id);
        if (!$congregationOffering) {
            return new Error('Erro ao atualizar, Oferta não encontrada', 404);
        }

        $congregation = $this->congregationRepository->findById($data['congregationId']);

        if (!$congregation) {
            return new Error('Congregação não encontrada', 404);
        }

        $congregationOffering->setValue($data['value']);
        $congregationOffering->setCongregation($congregation);
        $congregationOffering->setDate(DateTimeImmutable::createFromFormat('Y-m-d', $data['date']));

        $this->congregationOfferingRepository->save($congregationOffering);
        return new Success($congregationOffering);
    }

    private function validateInput(array $data): Result
    {
        $date = trim($data['date'] ?? '');
        $congregationId = trim($data['congregationId'] ?? '');
        $value = is_numeric($data['value']) ? $data['value'] : null;

        if (!is_numeric($value) || empty($date) || empty($congregationId)) {
            return new Error(
                'Preencha todos os campos corretamente',
                400,
                context: ['required_fields' => ['value', 'date', 'congregationId']]
            );
        }

        return new Success($data);
    }
}
