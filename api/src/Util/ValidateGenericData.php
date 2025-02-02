<?php

namespace App\Util;

use DateTimeImmutable;

class ValidateGenericData
{
    public function validateDate(string $date, string $format = 'Y-m-d'): bool
    {
        $dateFormatted = DateTimeImmutable::createFromFormat($format, $date);

        if (!$dateFormatted || $dateFormatted->format($format) !== $dateFormatted) {
            return false;
        }
        return true;
    }

    public function validateTelphone(string $telphone): bool
    {
        $telphoneFormatted = preg_replace('/\D/', '', $telphone);
        return preg_match('/^\d{11}$/', $telphoneFormatted) === 1;
    }
}
