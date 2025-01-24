<?php

namespace App\Tests\Integration\UseCase\Congregation;

use App\Entity\Congregation;
use App\UseCase\Congregation\CongregationRegister;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class RegisterCongregationTest extends KernelTestCase
{
    private CongregationRegister $congregationRegister;
    private EntityManagerInterface $entityManager;

    public function setUp(): void
    {
        self::bootKernel();

        $this->entityManager = static::getContainer()->get(EntityManagerInterface::class);
        $this->entityManager->beginTransaction();

        $this->congregationRegister = static::getContainer()->get(CongregationRegister::class);
    }

    public function tearDown(): void
    {
        $this->entityManager->rollback();
        $this->entityManager->close();
        parent::tearDown();
    }

    public function testRegisterCongregation(): void
    {
        $data = [
            'name' => 'test',
            'town' => 'test',
        ];

        $result = $this->congregationRegister->execute($data);

        if ($result->isError()) {
            $this->fail($result->getErrorMessage());
        }

        $congregation = $result->getValue();

        $this->assertInstanceOf(Congregation::class, $congregation);
        $this->assertIsInt($congregation->getId());
    }
}
