<?php

namespace App\Controller\Api;

use App\Service\JwtService;
use App\UseCase\Auth\LoginAdmin;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class AuthController extends BaseController
{
    public function __construct(
        private LoginAdmin $loginAdmin,
        private JwtService $jwtService
    ) {}

    public function loginAdmin(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $result = $this->loginAdmin->execute($email, $password);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(['token' => $result->getValue()]);
    }

    public function check()
    {
        return $this->json(['message' => 'Token is Valid']);
    }

    public function getAuthUser(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->jsonError(['message' => 'User not found'], 404);
        }

        return $this->json(['user' => $user]);
    }
}
