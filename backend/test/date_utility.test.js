const date_utility = require('../common/date_utility');
const expect = require('chai').expect;

describe('Date utility functions', () => {
	it('should get current date in MM/DD/YYYY format', async () => {
		const currentDate = date_utility.getCurrentDate();
		expect(currentDate).to.match(/^\d{2}\/\d{2}\/\d{4}$/); // Matches MM/DD/YYYY format
	});
	
	it('should calculate the number of days between two dates', async () => {
		const date1 = new Date('01/01/2022');
		const date2 = new Date('01/10/2022');
		const daysDifference = date_utility.getNumberDays(date1, date2);
		expect(daysDifference).to.equal(10);
	});
	
	it('should calculate the number of days between same dates', async () => {
		const date1 = new Date('12/12/2024');
		const date2 = new Date('12/12/2024');
		const daysDifference = date_utility.getNumberDays(date1, date2);
		expect(daysDifference).to.equal(1);
	});
	
	it('should calculate the number of days between dates 2 months apart', async () => {
		const date1 = new Date('05/05/2024');
		const date2 = new Date('07/05/2024');
		const daysDifference = date_utility.getNumberDays(date1, date2);
		expect(daysDifference).to.equal(62);
	});
	
	it('should calculate the number of days between dates few years apart', async () => {
		const date1 = new Date('10/20/2022');
		const date2 = new Date('02/08/2023');
		const daysDifference = date_utility.getNumberDays(date1, date2);
		expect(daysDifference).to.equal(112);
	});

	it('should check if date has passed - 01/01/2024', async () => {
		const result = date_utility.hasDatePassed('01/01/2024');
		expect(result).to.equal(true);
	});

	it('should check if date has passed - 01/01/2100', async () => {
		const result = date_utility.hasDatePassed('01/01/2100');
		expect(result).to.equal(false);
	});

	it('should format date - 01/01/2024', async () => {
		const formattedDate = date_utility.formatDate('01/01/2024');
		expect(formattedDate).to.equal('01/01/2024');
	});

	it('should format date - 2023/07/19', async () => {
		const formattedDate = date_utility.formatDate('2023/07/19');
		expect(formattedDate).to.equal('07/19/2023');
	});
});
