<?php

namespace App\Tests\Integration\UseCase\Admin;

use App\Entity\Admin;
use App\UseCase\Admin\AdminRegister;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class AdminRegisterTest extends KernelTestCase
{
    private AdminRegister $adminRegister;
    private EntityManagerInterface $entityManager;

    public function setUp(): void
    {
        self::bootKernel();

        $this->entityManager = static::getContainer()->get(EntityManagerInterface::class);
        $this->entityManager->beginTransaction();

        $this->adminRegister = static::getContainer()->get(AdminRegister::class);
    }

    public function tearDown(): void
    {
        $this->entityManager->rollback();
        $this->entityManager->close();
        parent::tearDown();
    }

    public function testRegisterAdmin(): void
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

        $admin = $result->getValue();

        $this->assertInstanceOf(Admin::class, $admin);
        $this->assertIsInt($admin->getId());
        $this->assertEquals($data['email'], $admin->getEmail());
    }
}
