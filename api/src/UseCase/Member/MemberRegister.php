<?php

namespace App\UseCase\Member;

use App\Entity\Member;
use App\Repository\CongregationRepository;
use App\Repository\MemberRepository;
use DateTimeImmutable;
use Exception;
use Samueldmonteiro\Result\{Result, Success, Error};

class MemberRegister
{
    public function __construct(
        private MemberRepository $memberRepository,
        private CongregationRepository $congregationRepository
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

        if (!$this->validateBirthDate($birthDate)) {
            return new Error('A Data de nascimento tem um formato inválido', 400);
        }

        if (!$this->validateTelphone($telphone)) {
            return new Error('O formato do telefone é inválido', 400);
        }

        if (!is_numeric($congregationId)) {
            return new Error('O campo congregação está mal formado', 400);
        }

        $congregation = $this->congregationRepository->findById((int) $congregationId);

        if (!$congregation) {
            return new Error('Congregação inexistente', 400);
        }

        $member = new Member(
            $fullName,
            DateTimeImmutable::createFromFormat('d/m/Y', $birthDate),
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

    private function validateBirthDate(string $birthdate, string $format = 'd/m/Y'): bool
    {
        $date = DateTimeImmutable::createFromFormat($format, $birthdate);

        if (!$date || $date->format($format) !== $birthdate) {
            return false;
        }

        return true;
    }

    private function validateTelphone(string $telphone): bool
    {
        $telphoneFormatted = preg_replace('/\D/', '', $telphone);
        return preg_match('/^\d{11}$/', $telphoneFormatted) === 1;
    }
}
