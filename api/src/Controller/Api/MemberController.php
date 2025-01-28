<?php

namespace App\Controller\Api;

use App\UseCase\Member\GetMembers;
use App\UseCase\Member\MemberRegister;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class MemberController extends BaseController
{
    public function __construct(
        private MemberRegister $memberRegister,
        private GetMembers $getMembers
    ) {}

    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $result = $this->memberRegister->execute($data);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(
            ['member' => $result->getValue()],
            context: ['json', 'groups' => ['member_read']]
        );
    }

    public function all(Request $request): JsonResponse
    {
        $data = $request->query->all();

        $result = $this->getMembers->execute($data);

        return $this->json(
            [
                'qt' => count($result),
                'members' => $result
            ],
            context: ['json', 'groups' => ['member_congregation_read']]
        );
    }
}
