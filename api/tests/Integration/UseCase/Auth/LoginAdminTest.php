<?php

namespace App\Tests\Integration\UseCase\Auth;

use App\UseCase\Admin\AdminRegister;
use App\UseCase\Auth\LoginAdmin;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class LoginAdminTest extends KernelTestCase
{
    private LoginAdmin $loginAdmin;
    private EntityManagerInterface $entityManager;
    private AdminRegister $adminRegister;

    public function setUp(): void
    {
        self::bootKernel();

        $this->entityManager = static::getContainer()->get(EntityManagerInterface::class);
        $this->entityManager->beginTransaction();

        $this->loginAdmin = static::getContainer()->get(LoginAdmin::class);
        $this->adminRegister = static::getContainer()->get(AdminRegister::class);

        $this->createUserTest();
    }

    public function tearDown(): void
    {
        $this->entityManager->rollback();
        $this->entityManager->close();
        parent::tearDown();
    }

    public function testGenerateAuthTokenWithCorrectLogin(): void
    {
        $result = $this->loginAdmin->execute('test@email.com', '13333');

        if ($result->isError()) {
            $this->fail($result->getErrorMessage());
        }

        $token = $result->getValue();
        $this->assertNotEmpty($token);
    }

    #[DataProvider('incorrectLogins')]
    public function testGenerateAuthTokenWithIncorrectLogin(string $email, string $password): void
    {
        $result = $this->loginAdmin->execute($email, $password);

        $this->assertTrue($result->isError(), 'Login está aceitando credenciais inválidas');
    }

    public static function incorrectLogins(): array
    {
        return [
            ['test@email.com', '09099'],
            ['test2@email.com', '13333'],
            ['test3@email.com', '093099'],
            ['', '13333'],
            ['test@email.com', ''],
            ['', ''],
        ];
    }

    private function createUserTest(): void
    {
        $data = [
            'name' => 'test',
            'email' => 'test@email.com',
            'position' => 'tester',
            'password' => '13333'
        ];

        $result = $this->adminRegister->execute($data);

        if ($result->isError()) {
            $this->fail($result->getErrorMessage());
        }
    }
}
