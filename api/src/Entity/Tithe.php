<?php

namespace App\Entity;

use App\Repository\TitheRepository;
use DateTimeInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: TitheRepository::class)]
#[ORM\Table(name: 'tithes')]
class Tithe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['tithe_read', 'tithe_member_congregation_read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'tithes')]
    #[Groups(['tithe_member_congregation_read'])]
    private ?Member $theMember = null;

    #[ORM\ManyToOne(inversedBy: 'tithes')]
    #[Groups(['tithe_member_congregation_read'])]
    private ?Congregation $congregation = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['tithe_read', 'tithe_member_congregation_read'])]
    private ?string $value = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['tithe_read', 'tithe_member_congregation_read'])]
    private ?string $object = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['tithe_read', 'tithe_member_congregation_read'])]
    private ?\DateTimeInterface $date = null;

    public function __construct(
        string $value,
        DateTimeInterface $date,
        Member $member,
        Congregation $congregation
    ) {
        $this->setValue($value);
        $this->setDate($date);
        $this->setCongregation($congregation);
        $this->setTheMember($member);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTheMember(): ?Member
    {
        return $this->theMember;
    }

    public function setTheMember(?Member $theMember): static
    {
        $this->theMember = $theMember;

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

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getObject(): ?string
    {
        return $this->object;
    }

    public function setObject(?string $object): static
    {
        $this->object = $object;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }
}
