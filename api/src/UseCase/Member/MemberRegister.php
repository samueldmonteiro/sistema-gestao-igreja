<?php

namespace App\UseCase\Member;

use App\Contract\Repository\CongregationRepositoryInterface;
use App\Contract\Repository\MemberRepositoryInterface;
use App\Entity\Member;
use App\Util\ValidateGenericData;
use DateTimeImmutable;
use Exception;
use Samueldmonteiro\Result\{Result, Success, Error};

class MemberRegister
{
    public function __construct(
        private MemberRepositoryInterface $memberRepository,
        private CongregationRepositoryInterface $congregationRepository,
        private ValidateGenericData $validate
    ) {}

    /**
     * @return Result<Member>
     */
    public function execute(array $data): Result
    {
        $data = (object) $data;

        $fullName = trim($data->fullName ?? '');
        $birthDate = trim($data->birthDate ?? '');
        $telphone = trim($data->telphone ?? '');
        $isBaptizedInWater = $data->isBaptizedInWater ?? false;
        $isBaptizedInHolySpirit = $data->isBaptizedInHolySpirit ?? false;
        $maritalStatus = trim($data->maritalStatus ?? '');
        $congregationId = trim($data->congregationId ?? '');

        if (
            empty($fullName) || empty($birthDate) || empty($telphone) ||
            empty($maritalStatus) || empty($congregationId)
        ) {
            return new Error(
                'Preencha todos os campos',
                400,
                context: [
                    'fields' => [
                        'fullName',
                        'birthDate',
                        'telphone',
                        'isBaptizedInWater',
                        'isBaptizedInHolySpirit',
                        'maritalStatus',
                        'congregationId'
                    ]
                ]
            );
        }

       # if (!$this->validate->validateDate($birthDate)) {
       #     return new Error('A Data de nascimento tem um formato inválido', 400);
      #  }

        if (!$this->validate->validateTelphone($telphone)) {
            return new Error('O formato do telefone é inválido', 400);
        }

        if($this->memberRepository->findByName($fullName)){
            return new Error('Já existe um membro com esse Nome', 400);
        }

        if (!is_numeric($congregationId)) {
            return new Error('O campo congregação está mal formado', 400);
        }

        $congregation = $this->congregationRepository->findById($congregationId);

        if (!$congregation) {
            return new Error('Congregação inexistente', 400);
        }

        $member = new Member(
            $fullName,
            DateTimeImmutable::createFromFormat('Y-m-d', $birthDate),
            $telphone,
            (bool) $isBaptizedInWater,
            (bool) $isBaptizedInHolySpirit,
            $maritalStatus,
            $congregation,
            new DateTimeImmutable('now')
        );

        try {
            $this->memberRepository->save($member);
        } catch (Exception $e) {
            return new Error('Erro inesperad ao registrar membro', 500, context: ['msg' => $e->getMessage()]);
        }

        return new Success($member);
    }
}
