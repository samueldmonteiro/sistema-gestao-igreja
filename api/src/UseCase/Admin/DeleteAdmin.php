<?php

namespace App\UseCase\Admin;

use App\Contract\Repository\AdminRepositoryInterface;
use Samueldmonteiro\Result\Error;
use Samueldmonteiro\Result\Result;
use Samueldmonteiro\Result\Success;

class DeleteAdmin
{
    public function __construct(
        private AdminRepositoryInterface $adminRepository
    ) {}

    /**
     * @return Result<true>
     */
    public function execute(int $id): Result
    {
        $admin = $this->adminRepository->findById($id);

        if (!$admin) {
            return new Error('Usuário não encontrado', 404);
        }

        $this->adminRepository->delete($admin);

        return new Success(true);
    }
}
