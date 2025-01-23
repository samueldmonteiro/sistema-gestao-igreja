<?php

namespace App\Controller\Api;

use App\UseCase\Auth\LoginAdmin;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class AuthController extends AbstractController
{
    public function __construct(
        private LoginAdmin $loginAdmin
    ) {}

    public function loginAdmin(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $result = $this->loginAdmin->execute($email, $password);

        if ($result->isError()) {
            return $this->json([
                'error' => true,
                'message' => $result->getErrorMessage(),
                'context' => $result->getContext() ?? null

            ], $result->getStatusCode());
        }

        return $this->json(['token' => $result->getValue()]);
    }
}
