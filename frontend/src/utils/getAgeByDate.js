import React from 'react'

const getAgeByDate = (datee) => {

    const hoje = new Date(); // Data atual
    const nascimento = new Date(datee); // Converter a string para uma data
    let idade = hoje.getFullYear() - nascimento.getFullYear(); // Diferença de anos

    // Ajustar caso o aniversário ainda não tenha ocorrido este ano
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    if (
        mesAtual < nascimento.getMonth() || 
        (mesAtual === nascimento.getMonth() && diaAtual < nascimento.getDate())
    ) {
        idade--;
    }

    return idade;
}

export default getAgeByDate