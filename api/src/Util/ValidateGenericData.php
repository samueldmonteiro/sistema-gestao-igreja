<?php

namespace App\Util;

use DateTimeImmutable;

class ValidateGenericData
{
    public function validateBirthDate(string $birthdate, string $format = 'Y-m-d'): bool
    {
        $date = DateTimeImmutable::createFromFormat($format, $birthdate);

        if (!$date || $date->format($format) !== $birthdate) {
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
