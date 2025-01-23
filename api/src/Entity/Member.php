<?php

namespace App\Entity;

use App\Entity\Enum\MaritalStatus;
use App\Repository\MemberRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MemberRepository::class)]
#[ORM\Table(name: 'members')]
class Member
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $fullName = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $birthDate = null;

    #[ORM\Column(length: 100)]
    private ?string $telphone = null;

    #[ORM\Column]
    private ?bool $isBaptizedInWater = null;

    #[ORM\Column]
    private ?bool $isBaptizedInHolySpirit = null;

    #[ORM\Column(type: 'string', enumType: MaritalStatus::class)]
    private ?MaritalStatus $maritalStatus = null;

    #[ORM\ManyToOne(inversedBy: 'members')]
    private ?Congregation $congregation = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isTither = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, Tithe>
     */
    #[ORM\OneToMany(targetEntity: Tithe::class, mappedBy: 'theMember')]
    private Collection $tithes;

    public function __construct()
    {
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

    public function getMaritalStatus(): ?MaritalStatus
    {
        return $this->maritalStatus;
    }

    public function setMaritalStatus(MaritalStatus $maritalStatus): static
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
