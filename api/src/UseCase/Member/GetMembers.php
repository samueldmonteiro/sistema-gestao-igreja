<?php

namespace App\UseCase\Member;

use App\Contract\Repository\CongregationRepositoryInterface;
use App\Contract\Repository\MemberRepositoryInterface;

class GetMembers
{
    public function __construct(
        private MemberRepositoryInterface $memberRepository,
        private CongregationRepositoryInterface $congregationRepository
    ) {}

    public function execute(array $params): array
    {
        $filters = [
            'name' => $params['name'] ?? null,
            'congregation' => $params['congregation'] ?? null,
            'onlyTithers' => ($params['onlyTithers'] ?? null) ? true : false,
            'registrationDate' => $params['registrationDate'] ?? null,
            'birthDate' => $params['birthDate'] ?? null,
            'isBaptizedWater' => ($params['isBaptizedWater'] ?? null) ? true : false,
            'isBaptizedSpirit' => ($params['isBaptizedSpirit'] ?? null) ? true : false
        ];

        return $this->memberRepository->findByFilters($filters);

    }
}
