<?php

namespace App\Controller\Api;

use App\Controller\Api\BaseController;
use App\UseCase\Tithe\GetTithes;
use App\UseCase\Tithe\RegisterTithe;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final class TitheController extends BaseController
{
    public function __construct(
        private RegisterTithe $registerTithe,
        private GetTithes $getTithes
    ) {}

    public function register(Request $r): JsonResponse
    {
        $data = json_decode($r->getContent(), true) ?? [];

        $result = $this->registerTithe->execute($data);

        if ($result->isError()) {
            return $this->jsonError($result);
        }

        return $this->json(
            ['tithe' => $result->getValue()],
            context: ['json', 'groups' => ['tithe_read']]
        );
    }

    public function all(Request $r): JsonResponse
    {
        $params = $r->query->all();

        $tithes = $this->getTithes->execute($params);

        return $this->json(
            [
                'qt' => count($tithes),
                'tithes' => $tithes
            ],
            context: ['json', 'groups' => ['tithe_member_congregation_read']]
        );
    }
}
