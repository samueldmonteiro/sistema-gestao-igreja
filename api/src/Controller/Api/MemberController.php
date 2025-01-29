<?php

namespace App\Controller\Api;

use App\UseCase\Member\DeleteMember;
use App\UseCase\Member\FindMemberById;
use App\UseCase\Member\GetMembers;
use App\UseCase\Member\MemberRegister;
use App\UseCase\Member\UpdateMember;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class MemberController extends BaseController
{
    public function __construct(
        private MemberRegister $memberRegister,
        private GetMembers $getMembers,
        private FindMemberById $findMemberById,
        private DeleteMember $deleteMember,
        private UpdateMember $updateMember
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

    public function update(int $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $result = $this->updateMember->execute($id, $data);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(
            ['member' => $result->getValue()],
            context: ['json', 'groups' => ['member_congregation_read']]
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

    public function find(int $id): JsonResponse
    {
        $member = $this->findMemberById->execute($id);

        if (!$member) {
            return $this->jsonError(['message' => 'Membro não encontrado'], 404);
        }

        return $this->json(['member' => $member], context: ['json', 'groups' => ['member_congregation_read']]);
    }

    public function delete(int $id): JsonResponse
    {
        $deleted = $this->deleteMember->execute($id);

        if (!$deleted) {
            return $this->jsonError([
                'message' => 'Houve um erro ao remover membro, tente novamente'
            ]);
        }

        return $this->json(['message' => 'Membro removido']);
    }
}
