<?php

namespace App\UseCase\Auth;

use App\Repository\AdminRepository;
use App\Service\JwtService;
use Samueldmonteiro\Result\Error;
use Samueldmonteiro\Result\Result;
use Samueldmonteiro\Result\Success;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class LoginAdmin
{
    public function __construct(
        private AdminRepository $adminRepository,
        private UserPasswordHasherInterface $hasher,
        private JwtService $jwtService
    ) {}

    /**
     * @return Result<string> JWT TOKEN
     */
    public function execute(string $email, string $password): Result
    {
        $incorrectLoginMessage = new Error('Login Incorreto', 401);

        if (empty(trim($email)) || empty(trim($password))) {
            return $incorrectLoginMessage;
        }

        if (strlen($password) < 4) {
            return $incorrectLoginMessage;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $incorrectLoginMessage;
        }

        $admin = $this->adminRepository->findByEmail($email);

        if (!$admin || !$this->hasher->isPasswordValid($admin, $password)) {
            return $incorrectLoginMessage;
        }

        $token = $this->jwtService->createToken($admin);

        return new Success($token);
    }
}
