const calculator_utility = require('../common/calculator_utility');
const expect = require('chai').expect;

describe('Calculator utility functions', () => {
  it('should calculate option return - test1', async () => {
    const currentDate = await calculator_utility.getOptionReturn(50, 5000);
    expect(currentDate).to.equal(1);
  });

  it('should calculate option return - test2', async () => {
    const currentDate = await calculator_utility.getOptionReturn(77.94, 2000);
    expect(currentDate).to.equal(3.897);
  });

  it('should calculate option return - test3', async () => {
    const currentDate = await calculator_utility.getOptionReturn(18.3, 2000);
    expect(currentDate).to.equal(0.915);
  });

  it('should calculate option return - test4', async () => {
    const currentDate = await calculator_utility.getOptionReturn(273.6, 49500);
    expect(currentDate).to.equal(0.553);
  });

  it('should calculate option arr return - test1', async () => {
    const date1 = new Date('01/01/2022');
    const date2 = new Date('01/10/2022');
    const daysDifference = await calculator_utility.getOptionARRReturn(date1, date2, 50, 5000);
    expect(daysDifference).to.equal(36.5);
  });

  it('should calculate option arr return - test2', async () => {
    const date1 = new Date('01/01/2022');
    const date2 = new Date('02/10/2022');
    const daysDifference = await calculator_utility.getOptionARRReturn(date1, date2, 50, 5000);
    expect(daysDifference).to.equal(8.902);
  });

  it('should calculate option arr return - test3', async () => {
    const date1 = new Date('12/16/2023');
    const date2 = new Date('01/16/2024');
    const daysDifference = await calculator_utility.getOptionARRReturn(date1, date2, 60, 2000);
    expect(daysDifference).to.equal(34.219);
  });

  it('should calculate option arr return - test4', async () => {
    const date1 = new Date('05/15/2023');
    const date2 = new Date('09/01/2023');
    const daysDifference = await calculator_utility.getOptionARRReturn(date1, date2, 350, 1200);
    expect(daysDifference).to.equal(96.781);
  });
});
