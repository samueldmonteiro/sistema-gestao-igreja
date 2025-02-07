<?php

namespace App\Controller\Api;

use App\UseCase\Congregation\CongregationRegister;
use App\UseCase\Congregation\DeleteCongregation;
use App\UseCase\Congregation\GetCongregations;
use App\UseCase\Congregation\getCongregationsWithTotalTithes;
use App\UseCase\Congregation\UpdateCongregation;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class CongregationController extends BaseController
{
    public function __construct(
        private CongregationRegister $congregationRegister,
        private GetCongregations $getCongregations,
        private getCongregationsWithTotalTithes $getCongregationsWithTotalTithes,
        private UpdateCongregation $updateCongregation,
        private DeleteCongregation $deleteCongregation
    ) {}

    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $result = $this->congregationRegister->execute($data);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(
            ['congregation' => $result->getValue()],
            context: ['json', 'groups' => ['congregation_read']],
        );
    }

    public function update(int $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $result = $this->updateCongregation->execute($id, $data);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(
            ['congregation' => $result->getValue()],
            context: ['json', 'groups' => ['congregation_read']]
        );
    }

    public function all(): JsonResponse
    {
        $congregations = $this->getCongregations->execute();

        return $this->json(
            ['congregations' => $congregations, 'qt' => count($congregations)],
            context: ['json', 'groups' => ['congregation_read']]
        );
    }

    public function totalTithes(Request $r): JsonResponse
    {
        $params = $r->query->all();
        $limit = $params['limit'] ?? 0;

        $congregations = $this->getCongregationsWithTotalTithes->execute($limit);

        return $this->json(
            ['congregations' => $congregations],
            context: ['json', 'groups' => ['congregation_read']]
        );
    }

    public function delete(int $id): JsonResponse
    {
        $result = $this->deleteCongregation->execute($id);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(['message' => 'Congregação removida com sucesso']);
    }
}
