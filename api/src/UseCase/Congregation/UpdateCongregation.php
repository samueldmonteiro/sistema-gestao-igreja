<?php

namespace App\UseCase\Congregation;

use App\Contract\Repository\CongregationRepositoryInterface;
use App\Entity\Congregation;
use Samueldmonteiro\Result\Error;
use Samueldmonteiro\Result\Result;
use Samueldmonteiro\Result\Success;

class UpdateCongregation
{
    public function __construct(
        private CongregationRepositoryInterface $congregationRepository,
    ) {}

    /**
     * @return Result<Congregation>
     */
    public function execute(int $id, array $data): Result
    {
        $name = trim($data['name'] ?? '');
        $town = trim($data['town'] ?? '');

        if (empty($name) || empty($town)) {
            return new Error('Preencha todos os campos', 400, context: ['required_fields' => ['name', 'town']]);
        }

        $congregation = $this->congregationRepository->findById($id);

        if (!$congregation) {
            return new Error('Congregação não encontrada', 404);
        }

        if ($congregation->getName() == $name && $congregation->getTown() == $town) {
            return new Success($congregation);
        }

        $congregation->setName($name);
        $congregation->setTown($town);
        $this->congregationRepository->save($congregation);

        return new Success($congregation);
    }
}
