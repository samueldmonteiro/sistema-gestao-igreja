<?php

namespace App\UseCase\Member;

use App\Contract\Repository\CongregationRepositoryInterface;
use App\Contract\Repository\MemberRepositoryInterface;
use App\Entity\Member;
use App\Util\ValidateGenericData;
use DateTimeImmutable;
use Samueldmonteiro\Result\Error;
use Samueldmonteiro\Result\Result;
use Samueldmonteiro\Result\Success;

class UpdateMember
{
    public function __construct(
        private MemberRepositoryInterface $memberRepository,
        private CongregationRepositoryInterface $congregationRepository,
        private ValidateGenericData $validate
    ) {}
    
    /**
     * @return Result<Member>
     */
    public function execute(int $id, array $data): Result
    {
        $member = $this->memberRepository->findById($id);

        if (!$member) {
            return new Error('Membro não encontrado', 404);
        }

        $data = (object) $data;

        $fullName = trim($data->fullName ?? '');
        $birthDate = trim($data->birthDate ?? '');
        $telphone = trim($data->telphone ?? '');
        $isBaptizedInWater = $data->isBaptizedInWater ?? false;
        $isBaptizedInHolySpirit = $data->isBaptizedInHolySpirit ?? false;
        $maritalStatus = trim($data->maritalStatus ?? '');
        $congregationId = trim($data->congregation ?? '');
        
        if ($fullName) {
            $member->setFullName($fullName);
        }

        if (!$birthDate) {
            return new Error('Data de Nascimento tem um formato inválido', 400);
        }

        if($birthDate){
            $member->setBirthDate(DateTimeImmutable::createFromFormat('Y-m-d', $birthDate));
        }

        if ($telphone) {
            $member->setTelphone($telphone);
        }

        if (is_bool($isBaptizedInWater) ) {
            $member->setIsBaptizedInWater($isBaptizedInWater);
        }

        if (is_bool($isBaptizedInHolySpirit)) {
            $member->setIsBaptizedInHolySpirit($isBaptizedInHolySpirit);
        }

        if ($maritalStatus) {
            $member->setMaritalStatus($maritalStatus);
        }

        if (!is_numeric($congregationId)) {
            return new Error('Congregação não encontrada', 404);
        }

        $congregation = $this->congregationRepository->findById($congregationId);

        if (!$congregation) {
            return new Error('Congregação não encontrada', 404);
        }

        $member->setCongregation($congregation);

        $this->memberRepository->save($member);

        return new Success($member);
    }
}
