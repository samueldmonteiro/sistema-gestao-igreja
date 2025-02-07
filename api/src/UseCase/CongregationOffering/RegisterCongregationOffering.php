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

class RegisterCongregationOffering
{
    public function __construct(
        private CongregationOfferingRepositoryInterface $congregationOfferingRepository,
        private CongregationRepositoryInterface $congregationRepository,
        private ValidateGenericData $validate
    ) {}

    /**
     * @return Result<CongregationOffering>
     */
    public function execute(array $data): Result
    {
        $validateInput = $this->validateInput($data);
        if ($validateInput->isError()) {
            return $validateInput;
        }

        if (!$this->validate->validateDate($data['date'])) {
            return new Error('A data enviada tem um formato inválido', 400);
        }

        if (!is_numeric($data['congregationId'])) {
            return new Error('Congregação não encontrada', 404);
        }

        $congregation = $this->congregationRepository->findById($data['congregationId']);

        if (!$congregation) {
            return new Error('Congregação não encontrada', 404);
        }

        $congregationOffering = new CongregationOffering(
            $data['value'],
            DateTimeImmutable::createFromFormat('Y-m-d', $data['date']),
            $congregation
        );

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
