const date_utility = require('../common/date_utility');
const option_decimal_places = 3;

var getOptionReturn = function(premium, collateral) {
    let option_return = premium / collateral * 100;
    option_return = Number(option_return.toFixed(option_decimal_places));
    return option_return;
}

var getOptionARRReturn = function(date_opened, date_of_expiry, premium, collateral) {
    const num_days = date_utility.getNumberDays(date_opened, date_of_expiry);
    const option_return  = getOptionReturn(premium, collateral);
    let option_arr = option_return / num_days * 365;
    option_arr = Number(option_arr.toFixed(option_decimal_places));
    return option_arr;
}

module.exports = {
    getOptionReturn,
    getOptionARRReturn
};
