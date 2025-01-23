<?php

namespace App\Controller\Api;

use Samueldmonteiro\Result\Result;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BaseController extends AbstractController
{
    protected function jsonError(array|Result $data, int $statusCode = 400, string $type = 'error')
    {
        if (is_array($data)) {
            $dataMerged = array_merge(['error' => true, 'type' => $type], $data);
            return $this->json($dataMerged, $statusCode);
        }

        return $this->json(
            [
                'error' => true,
                'message' => $data->getErrorMessage(),
                'type' => $data->getErrorType() ?? $type,
                'context' => !empty($data->getContext()) ? $data->getContext() : null
            ],
            $data->getStatusCode() ?? $statusCode
        );
    }
}
