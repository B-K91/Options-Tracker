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

var hasDatePassed = function(dateString) {
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
    return dateObject.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
};


module.exports = {
    getCurrentDate,
    getNumberDays,
    hasDatePassed,
    formatDate
};