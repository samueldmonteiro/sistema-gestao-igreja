<?php

namespace App\Controller\Api;

use App\UseCase\Congregation\CongregationRegister;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class CongregationController extends BaseController
{
    public function __construct(
        private CongregationRegister $congregationRegister
    ) {}

    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $result = $this->congregationRegister->execute($data);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(['congregation' => $result->getValue()]);
    }
}
