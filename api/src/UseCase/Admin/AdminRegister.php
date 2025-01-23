<?php

namespace App\UseCase\Admin;

use Exception;
use DateTimeImmutable;
use App\Entity\Admin;
use App\Entity\ValueObject\Email;
use App\Repository\AdminRepository;
use Samueldmonteiro\Result\{Result, Success, Error};
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AdminRegister
{
    public function __construct(
        private AdminRepository $adminRepository,
        private UserPasswordHasherInterface $hasher
    ) {}

    /**
     * @return Result<Admin>
     */
    public function execute(array $data): Result
    {
        $data = (object) $data;

        $name = trim($data->name ?? '');
        $email = trim($data->email ?? '');
        $position = trim($data->position ?? '');
        $password = trim($data->password ?? '');

        if (empty($name) || empty($email) || empty($position) || empty($password)) {
            return new Error('Preencha todos os campos corretamente', 400, null, [
                'fields' => ['name', 'email', 'position', 'password']
            ]);
        }

        if (strlen($password) < 4) {
            return new Error('A senha prescisa ter mais de 3 letras', 400);
        }

        try {
            $email = new Email($email);
        } catch (Exception) {
            return new Error('O email tem um formato incorreto', 400);
        }

        if ($this->adminRepository->findByEmail($email)) {
            return new Error('Este email já está cadastrado', 400);
        }

        $admin = new Admin($name, $email, $password, $position, new DateTimeImmutable('now'));
        $admin->setRoles(['ROLE_IS_ADMIN']);
        $admin->setPassword($this->hasher->hashPassword($admin, $password));

        try {
            $this->adminRepository->save($admin);
        } catch (Exception) {
            return new Error('Erro inesperad ao criar usuário', 500);
        }

        return new Success($admin);
    }
}