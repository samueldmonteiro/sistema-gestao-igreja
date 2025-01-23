<?php

namespace App\Controller\Api\Admin;

use App\Service\JwtService;
use App\UseCase\Admin\AdminRegister;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class AdminController extends AbstractController
{
    public function __construct(
        private AdminRegister $adminRegister,
        private JwtService $jwtService
    ) {}

    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $result = $this->adminRegister->execute($data);

        if ($result->isError()) {
            return $this->json([
                'error' => true,
                'message' => $result->getErrorMessage(),
                'context' => $result->getContext() ?? null

            ], $result->getStatusCode());
        }

        $admin = $result->getValue();
        $token = $this->jwtService->createToken($admin);

        return $this->json([
            'admin' => $admin,
            'token' => $token
        ]);
    }
}
