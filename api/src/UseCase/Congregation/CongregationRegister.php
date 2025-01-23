<?php

namespace App\UseCase\Congregation;

use App\Entity\Congregation;
use App\Repository\CongregationRepository;
use Exception;
use Samueldmonteiro\Result\{Result, Success, Error};

class CongregationRegister
{
    public function __construct(
        private CongregationRepository $congregationRepository,
    ) {}

    /**
     * @return Result<Congregation>
     */
    public function execute(array $data): Result
    {
        $data = (object) $data;

        $name = trim($data->name ?? '');
        $town = trim($data->town ?? '');

        if (empty($name) || empty($town)) {
            return new Error('Preencha todos os campos', 400, context: [
                ['fields' => ['name', 'town']]
            ]);
        }

        if ($this->congregationRepository->findByName($name)) {
            return new Error('Já existe uma Congregação com esse nome', 400);
        }

        $congregation = new Congregation($name, $town);

        try {
            $this->congregationRepository->save($congregation);
        } catch (Exception $e) {
            return new Error('Erro ao cadastrar Congregação', 500, context: ['msg' => $e->getMessage()]);
        }

        return new Success($congregation);
    }
}
