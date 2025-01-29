const getAgeByDate = (datee) => {

    const hoje = new Date(); // Data atual
    const nascimento = new Date(datee); // Converter a string para uma data
    let idade = hoje.getFullYear() - nascimento.getFullYear(); // Diferença de anos

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