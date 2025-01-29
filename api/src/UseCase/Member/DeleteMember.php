<?php

namespace App\UseCase\Member;

use App\Contract\Repository\MemberRepositoryInterface;
use Exception;

class DeleteMember
{
    public function __construct(
        private MemberRepositoryInterface $memberRepository
    ) {}

    public function execute(int $id): bool
    {
        $member = $this->memberRepository->findById($id);

        if (!$member) return false;

        try {
            $this->memberRepository->delete($member);
            return true;
        } catch (Exception) {
            return false;
        }
    }
}
