<?php

namespace App\UseCase\Member;

use App\Contract\Repository\MemberRepositoryInterface;
use App\Entity\Member;

class FindMemberById
{
    public function __construct(
        private MemberRepositoryInterface $memberRepository
    ) {}

    public function execute(int $id): ?Member
    {
        if (!$id) return null;
        
        $id = (int) filter_var($id, FILTER_SANITIZE_SPECIAL_CHARS);
        return $this->memberRepository->findById($id);
    }
}
