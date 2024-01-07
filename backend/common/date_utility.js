var getCurrentDate = async function() {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${month}/${day}/${year}`;
}

var getNumberDays = async function(date1, date2) {
    const ONE_DAY = 24 * 60 * 60 * 1000; // milliseconds in a day
    
    // Set both dates to the beginning of the day to ensure accurate calculation
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    
    // Calculate the difference in days
    const diffDays = Math.round(Math.abs((date1 - date2) / ONE_DAY)) + 1;
    
    return diffDays;
}

module.exports = {
    getCurrentDate,
    getNumberDays
};