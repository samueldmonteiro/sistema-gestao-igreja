<?php

namespace App\Entity;

use App\Repository\CongregationOfferingRepository;
use DateTimeInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: CongregationOfferingRepository::class)]
#[ORM\Table(name: 'congregation_offerings')]
class CongregationOffering
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['congregation_offering_read', 'congregation_offering_congregation_read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'congregationOfferings')]
    #[ORM\JoinColumn(onDelete: 'SET NULL', nullable: true)]
    #[Groups(['congregation_offering_congregation_read'])]
    private ?Congregation $congregation = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['congregation_offering_read', 'congregation_offering_congregation_read'])]
    private ?string $value = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['congregation_offering_read', 'congregation_offering_congregation_read'])]
    private ?\DateTimeInterface $date = null;

    public function __construct(
        string $value,
        DateTimeInterface $date,
        Congregation $congregation
    ) {
        $this->setValue($value);
        $this->setDate($date);
        $this->setCongregation($congregation);
    }
    
    public function getId(): ?int
    {
        return $this->id;
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
