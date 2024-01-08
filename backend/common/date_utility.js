var getCurrentDate = function() {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${month}/${day}/${year}`;
}

var getNumberDays = function(dateString1, dateString2) {
    const ONE_DAY = 24 * 60 * 60 * 1000; // milliseconds in a day
    
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // Calculate the difference in days
    const diffDays = Math.round(Math.abs((date1 - date2) / ONE_DAY)) + 1;
    
    return diffDays;
}

module.exports = {
    getCurrentDate,
    getNumberDays
};