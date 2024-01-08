const date_utility = require('../common/date_utility');
const expect = require('chai').expect;

describe('Date utility functions', () => {
	it('should get current date in MM/DD/YYYY format', async () => {
		const currentDate = await date_utility.getCurrentDate();
		expect(currentDate).to.match(/^\d{2}\/\d{2}\/\d{4}$/); // Matches MM/DD/YYYY format
	});
	
	it('should calculate the number of days between two dates', async () => {
		const date1 = new Date('01/01/2022');
		const date2 = new Date('01/10/2022');
		const daysDifference = await date_utility.getNumberDays(date1, date2);
		expect(daysDifference).to.equal(10);
	});
	
	it('should calculate the number of days between same dates', async () => {
		const date1 = new Date('12/12/2024');
		const date2 = new Date('12/12/2024');
		const daysDifference = await date_utility.getNumberDays(date1, date2);
		expect(daysDifference).to.equal(1);
	});
	
	it('should calculate the number of days between dates 2 months apart', async () => {
		const date1 = new Date('05/05/2024');
		const date2 = new Date('07/05/2024');
		const daysDifference = await date_utility.getNumberDays(date1, date2);
		expect(daysDifference).to.equal(62);
	});
	
	it('should calculate the number of days between dates few years apart', async () => {
		const date1 = new Date('10/20/2022');
		const date2 = new Date('02/08/2023');
		const daysDifference = await date_utility.getNumberDays(date1, date2);
		expect(daysDifference).to.equal(112);
	});
});
