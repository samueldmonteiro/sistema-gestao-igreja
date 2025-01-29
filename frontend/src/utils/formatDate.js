function formatDate(dateString, format='dd/MM/yyyy') {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return;
    }

    const options = {
        yyyy: date.getUTCFullYear(),
        yy: String(date.getUTCFullYear()).slice(-2),
        MM: String(date.getUTCMonth() + 1).padStart(2, '0'),
        dd: String(date.getUTCDate()).padStart(2, '0'),
        HH: String(date.getUTCHours()).padStart(2, '0'),
        mm: String(date.getUTCMinutes()).padStart(2, '0'),
        ss: String(date.getUTCSeconds()).padStart(2, '0')
    };

    return format.replace(/yyyy|yy|MM|dd|HH|mm|ss/g, match => options[match]);
}

export default formatDate