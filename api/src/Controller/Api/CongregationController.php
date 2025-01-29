<?php

namespace App\Controller\Api;

use App\UseCase\Congregation\CongregationRegister;
use App\UseCase\Congregation\GetCongregations;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class CongregationController extends BaseController
{
    public function __construct(
        private CongregationRegister $congregationRegister,
        private GetCongregations $getCongregations
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

    public function all(): JsonResponse
    {
        $congregations = $this->getCongregations->execute();

        return $this->json(
            ['congregations' => $congregations],
            context: ['json', 'groups' => ['congregation_read']]
        );
    }
}
