<?php

namespace App\Tests\Integration\UseCase\Member;

use App\Entity\Congregation;
use App\Entity\Member;
use App\UseCase\Congregation\CongregationRegister;
use App\UseCase\Member\MemberRegister;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class MemberRegisterTest extends KernelTestCase
{
    private CongregationRegister $congregationRegister;
    private MemberRegister $memberRegister;
    private EntityManagerInterface $entityManager;

    public function setUp(): void
    {
        self::bootKernel();

        $this->entityManager = static::getContainer()->get(EntityManagerInterface::class);
        $this->entityManager->beginTransaction();

        $this->congregationRegister = static::getContainer()->get(CongregationRegister::class);
        $this->memberRegister = static::getContainer()->get(MemberRegister::class);
    }

    public function tearDown(): void
    {
        $this->entityManager->rollback();
        $this->entityManager->close();
        parent::tearDown();
    }

    public function testRegisterMember(): void
    {
        $data = [
            "fullName" => "julia",
            "birthDate" => "19/09/2004",
            "telphone" => "99999999999",
            "isBaptizedInWater" => true,
            "isBaptizedInHolySpirit" => true,
            "maritalStatus" => "Solteiro",
            "congregationId" => $this->createCongregationTest()->getId()
        ];

        $result = $this->memberRegister->execute($data);

        if ($result->isError()) {
            $this->fail($result->getErrorMessage());
        }

        $member = $result->getValue();

        $this->assertInstanceOf(Member::class, $member);
        $this->assertIsInt($member->getId());
    }

    private function createCongregationTest(): Congregation
    {
        return $this->congregationRegister->execute(
            ['name' => 'teste congregation', 'town' => 'local']
        )->getValue();
    }
}
