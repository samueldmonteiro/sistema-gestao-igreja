<?php

namespace App\Controller\Api;

use App\Controller\Api\BaseController;
use App\Service\JwtService;
use App\UseCase\Admin\AdminRegister;
use App\UseCase\Admin\DeleteAdmin;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class AdminController extends BaseController
{
    public function __construct(
        private AdminRegister $adminRegister,
        private DeleteAdmin $deleteAdmin,
        private JwtService $jwtService
    ) {}

    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $result = $this->adminRegister->execute($data);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        $admin = $result->getValue();
        $token = $this->jwtService->createToken($admin);

        return $this->json([
            'admin' => $admin,
            'token' => $token
        ]);
    }

    public function delete(int $id): JsonResponse
    {
        $result = $this->deleteAdmin->execute($id);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(['message' => 'Usuário removida com sucesso']);
    }
}
