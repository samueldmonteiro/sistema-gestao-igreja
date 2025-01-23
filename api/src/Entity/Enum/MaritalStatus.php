<?php

namespace App\Entity\Enum;

enum MaritalStatus:string
{
    case CASADO  = 'Casado(a)';
    case MORA_JUNTO = 'Mora Junto';
    case SOLTEIRO = 'Solteiro(a)';
    case VIUVO = 'Viuvo(a)';
}
