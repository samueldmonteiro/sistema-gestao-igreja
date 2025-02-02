<?php

namespace App\Entity;

use App\Entity\Enum\MaritalStatus;
use App\Repository\MemberRepository;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: MemberRepository::class)]
#[ORM\Table(name: 'members')]
class Member
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['member_read', 'member_congregation_read', 'tithe_member_congregation_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['member_read', 'member_congregation_read', 'tithe_member_congregation_read'])]
    private ?string $fullName = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['member_read', 'member_congregation_read', 'tithe_member_congregation_read'])]
    private ?DateTimeInterface $birthDate = null;

    #[ORM\Column(length: 100)]
    #[Groups(['member_read', 'member_congregation_read', 'tithe_member_congregation_read'])]
    private ?string $telphone = null;

    #[ORM\Column]
    #[Groups(['member_read', 'member_congregation_read', 'tithe_member_congregation_read'])]
    private ?bool $isBaptizedInWater = null;

    #[ORM\Column]
    #[Groups(['member_read', 'member_congregation_read', 'tithe_member_congregation_read'])]
    private ?bool $isBaptizedInHolySpirit = null;

    #[ORM\Column(length: 50)]
    #[Groups(['member_read', 'member_congregation_read', 'tithe_member_congregation_read'])]
    private ?string $maritalStatus = null;

    #[ORM\ManyToOne(inversedBy: 'members')]
    #[MaxDepth(1)]
    #[Groups(['member_congregation_read'])]
    private ?Congregation $congregation = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['member_read', 'member_congregation_read', 'tithe_member_congregation_read'])]
    private ?bool $isTither = null;

    #[ORM\Column]
    #[Groups(['member_read', 'member_congregation_read', 'tithe_member_congregation_read'])]
    private ?DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, Tithe>
     */
    #[ORM\OneToMany(targetEntity: Tithe::class, mappedBy: 'theMember')]
    private Collection $tithes;

    public function __construct(
        string $fullName,
        DateTimeInterface $birthDate,
        string $telphone,
        bool $isBaptizedInWater,
        bool $isBaptizedInHolySpirit,
        string $maritalStatus,
        Congregation $congregation,
        DateTimeImmutable $createdAt
    ) {
        $this->setFullName($fullName);
        $this->setBirthDate($birthDate);
        $this->setTelphone($telphone);
        $this->setIsBaptizedInWater($isBaptizedInWater);
        $this->setIsBaptizedInHolySpirit($isBaptizedInHolySpirit);
        $this->setMaritalStatus($maritalStatus);
        $this->setCongregation($congregation);
        $this->setCreatedAt($createdAt);

        $this->tithes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): static
    {
        $this->fullName = $fullName;

        return $this;
    }

    public function getBirthDate(): ?\DateTimeInterface
    {
        return $this->birthDate;
    }

    public function setBirthDate(\DateTimeInterface $birthDate): static
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function getTelphone(): ?string
    {
        return $this->telphone;
    }

    public function setTelphone(string $telphone): static
    {
        $this->telphone = $telphone;

        return $this;
    }

    public function isBaptizedInWater(): ?bool
    {
        return $this->isBaptizedInWater;
    }

    public function setIsBaptizedInWater(bool $isBaptizedInWater): static
    {
        $this->isBaptizedInWater = $isBaptizedInWater;

        return $this;
    }

    public function isBaptizedInHolySpirit(): ?bool
    {
        return $this->isBaptizedInHolySpirit;
    }

    public function setIsBaptizedInHolySpirit(bool $isBaptizedInHolySpirit): static
    {
        $this->isBaptizedInHolySpirit = $isBaptizedInHolySpirit;

        return $this;
    }

    public function getMaritalStatus(): ?string
    {
        return $this->maritalStatus;
    }

    public function setMaritalStatus(string $maritalStatus): static
    {
        $this->maritalStatus = $maritalStatus;

        return $this;
    }

    public function getCongregation(): ?Congregation
    {
        return $this->congregation;
    }

    public function setCongregation(?Congregation $congregation): static
    {
        $this->congregation = $congregation;

        return $this;
    }

    public function isTither(): ?bool
    {
        return $this->isTither;
    }

    public function setIsTither(?bool $isTither): static
    {
        $this->isTither = $isTither;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, Tithe>
     */
    public function getTithes(): Collection
    {
        return $this->tithes;
    }

    public function addTithe(Tithe $tithe): static
    {
        if (!$this->tithes->contains($tithe)) {
            $this->tithes->add($tithe);
            $tithe->setTheMember($this);
        }

        return $this;
    }

    public function removeTithe(Tithe $tithe): static
    {
        if ($this->tithes->removeElement($tithe)) {
            // set the owning side to null (unless already changed)
            if ($tithe->getTheMember() === $this) {
                $tithe->setTheMember(null);
            }
        }

        return $this;
    }
}
