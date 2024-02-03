const getCurrentDate = function() {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${month}/${day}/${year}`;
}

const getNumberDays = function(dateString1, dateString2) {
    const ONE_DAY = 24 * 60 * 60 * 1000; // milliseconds in a day
    
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // Calculate the difference in days
    const diffDays = Math.round(Math.abs((date1 - date2) / ONE_DAY)) + 1;
    
    return diffDays;
}

const hasDatePassed = function(dateString) {
    // Convert the MM/DD/YYYY string to a Date object
    const parts = dateString.split('/');
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    const inputDate = new Date(year, month - 1, day); // Month is zero-based
  
    // Get the current date
    const currentDate = new Date();
  
    // Compare the dates
    return inputDate < currentDate;
}

const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString('UTC', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'UTC'
    });
};

const formatDateYYYYMMDD = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};


module.exports = {
    getCurrentDate,
    getNumberDays,
    hasDatePassed,
    formatDate,
    formatDateYYYYMMDD
};