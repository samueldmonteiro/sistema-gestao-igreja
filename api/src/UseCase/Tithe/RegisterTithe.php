<?php

namespace App\UseCase\Tithe;

use App\Contract\Repository\CongregationRepositoryInterface;
use App\Contract\Repository\MemberRepositoryInterface;
use App\Contract\Repository\TitheRepositoryInterface;
use App\Entity\Tithe;
use App\Util\ValidateGenericData;
use DateTimeImmutable;
use Samueldmonteiro\Result\{Result, Error, Success};

class RegisterTithe
{
    public function __construct(
        private TitheRepositoryInterface $titheRepository,
        private CongregationRepositoryInterface $congregationRepository,
        private MemberRepositoryInterface $memberRepository,
        private ValidateGenericData $validate
    ) {}

    /**
     * @return Result<Tithe>
     */
    public function execute(array $data): Result
    {
        $validateInput = $this->validateInput($data);
        if ($validateInput->isError()) {
            return $validateInput;
        }

        $congregation = $this->congregationRepository->findById($data['congregationId']);
        if (!$congregation) {
            return new Error('Congregação não encontrada', 404);
        }

        $member = $this->memberRepository->findById($data['memberId']);
        if (!$member) {
            return new Error('Congregação não encontrada', 404);
        }

        $tithe = new Tithe(
            $data['value'],
            DateTimeImmutable::createFromFormat('Y-m-d', $data['date']),
            $member,
            $congregation
        );

        $this->titheRepository->save($tithe);
        $member->setIsTither(true);
        $this->memberRepository->save($member);

        return new Success($tithe);
    }

    /**
     * @return Result<true>
     */
    private function validateInput(array $data): Result
    {
        $data = (object) $data;

        $value = trim($data->value ?? '');
        $date = trim($data->date ?? '');
        $congregationId = $data->congregationId ?? null;
        $memberId = $data->memberId ?? null;

        if (empty($value) || empty($date) || !$congregationId || !$memberId) {
            return new Error('Preencha todos os campos corretamente', 400, context: [
                'required fields' => ['value', 'date', 'memberId', 'congregationId']
            ]);
        }

        if (!$this->validate->validateDate($date)) {
            return new Error('A Data do dízimo tem um formato inválido', 400);
        }

        if (!is_numeric($congregationId)) {
            return new Error('Congregação não encontrada', 404);
        }

        if (!is_numeric($memberId)) {
            return new Error('Membro não encontrada', 404);
        }

        return new Success(true);
    }
}
