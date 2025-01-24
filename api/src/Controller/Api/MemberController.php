<?php

namespace App\Controller\Api;

use App\UseCase\Member\MemberRegister;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class MemberController extends BaseController
{
    public function __construct(
        private MemberRegister $memberRegister
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
}
