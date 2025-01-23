<?php

namespace App\Entity;

use App\Repository\CongregationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CongregationRepository::class)]
#[ORM\Table(name: 'congregations')]
class Congregation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $town = null;

    /**
     * @var Collection<int, Member>
     */
    #[ORM\OneToMany(targetEntity: Member::class, mappedBy: 'congregation')]
    private Collection $members;

    /**
     * @var Collection<int, CongregationOffering>
     */
    #[ORM\OneToMany(targetEntity: CongregationOffering::class, mappedBy: 'congregation')]
    private Collection $congregationOfferings;

    /**
     * @var Collection<int, Tithe>
     */
    #[ORM\OneToMany(targetEntity: Tithe::class, mappedBy: 'congregation')]
    private Collection $tithes;

    public function __construct()
    {
        $this->members = new ArrayCollection();
        $this->congregationOfferings = new ArrayCollection();
        $this->tithes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getTown(): ?string
    {
        return $this->town;
    }

    public function setTown(string $town): static
    {
        $this->town = $town;

        return $this;
    }

    /**
     * @return Collection<int, Member>
     */
    public function getMembers(): Collection
    {
        return $this->members;
    }

    public function addMember(Member $member): static
    {
        if (!$this->members->contains($member)) {
            $this->members->add($member);
            $member->setCongregation($this);
        }

        return $this;
    }

    public function removeMember(Member $member): static
    {
        if ($this->members->removeElement($member)) {
            // set the owning side to null (unless already changed)
            if ($member->getCongregation() === $this) {
                $member->setCongregation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, CongregationOffering>
     */
    public function getCongregationOfferings(): Collection
    {
        return $this->congregationOfferings;
    }

    public function addCongregationOffering(CongregationOffering $congregationOffering): static
    {
        if (!$this->congregationOfferings->contains($congregationOffering)) {
            $this->congregationOfferings->add($congregationOffering);
            $congregationOffering->setCongregation($this);
        }

        return $this;
    }

    public function removeCongregationOffering(CongregationOffering $congregationOffering): static
    {
        if ($this->congregationOfferings->removeElement($congregationOffering)) {
            // set the owning side to null (unless already changed)
            if ($congregationOffering->getCongregation() === $this) {
                $congregationOffering->setCongregation(null);
            }
        }

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
            $tithe->setCongregation($this);
        }

        return $this;
    }

    public function removeTithe(Tithe $tithe): static
    {
        if ($this->tithes->removeElement($tithe)) {
            // set the owning side to null (unless already changed)
            if ($tithe->getCongregation() === $this) {
                $tithe->setCongregation(null);
            }
        }

        return $this;
    }
}
