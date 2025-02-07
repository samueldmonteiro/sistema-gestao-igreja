<?php

namespace App\Controller\Api;

use App\UseCase\CongregationOffering\DeleteCongregationOffering;
use App\UseCase\CongregationOffering\GetCongregationOfferings;
use App\UseCase\CongregationOffering\RegisterCongregationOffering;
use App\UseCase\CongregationOffering\TotalCongregationOfferings;
use App\UseCase\CongregationOffering\UpdateCongregationOffering;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class CongregationOfferingController extends BaseController
{
    public function __construct(
        private RegisterCongregationOffering $registerCongregationOffering,
        private UpdateCongregationOffering $updateCongregationOffering,
        private DeleteCongregationOffering $deleteCongregationOffering,
        private GetCongregationOfferings $getCongregationOfferings,
        private TotalCongregationOfferings $totalCongregationOfferings
    ) {}

    public function all(Request $r): JsonResponse
    {
        $params = $r->query->all();

        $list = $this->getCongregationOfferings->execute($params);

        return $this->json(
            [
                'congregationOfferings' => $list,
                'count' => count($list)
            ],
            context: ['json', 'groups' => ['congregation_offering_congregation_read']]
        );
    }

    public function register(Request $r): JsonResponse
    {
        $data = json_decode($r->getContent(), true) ?? [];

        $result = $this->registerCongregationOffering->execute($data);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(
            ['congregationOffering' => $result->getValue()],
            context: ['json', 'groups' => ['congregation_offering_congregation_read']]
        );
    }

    public function update(int $id, Request $r): JsonResponse
    {
        $data = json_decode($r->getContent(), true) ?? [];

        $result = $this->updateCongregationOffering->execute($id, $data);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(
            ['congregationOffering' => $result->getValue()],
            context: ['json', 'groups' => ['congregation_offering_congregation_read']]
        );
    }

    public function delete(int $id): JsonResponse
    {
        $result = $this->deleteCongregationOffering->execute($id);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(
            ['message' => 'Oferta deletada com sucesso']
        );
    }

    public function total(Request $r)
    {
        $params = $r->query->all();

        $result = $this->totalCongregationOfferings->execute($params);

        return $this->json(['congregations' => $result]);
    }
}
