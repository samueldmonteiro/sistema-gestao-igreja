export default function formatValueToBRL(value) {
    
    if(!value) value = 0;
    
    return parseFloat(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
