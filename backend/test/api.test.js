const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;


// FIXME: Abhishek add something which will create empty db for unit tests all the time

// FIXME: Abhishek add more GET tests
describe('Options GET API tests', () => {
	it('GET /option/ on empty database', (done) => {
		chai.request(app)
		.get('/option/')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.be.equal(0);
			done();
		});
	});

	it('POST /option/ negative test on empty database', (done) => {
		chai.request(app)
		.post('/option/')
		.end((err, res) => {
			expect(res).to.have.status(404);
			done();
		});
	});
});

// FIXME: Abhishek add more POST tests
describe('Options POST API tests', () => {
	it('POST /option/', (done) => {
		const newOption = {
			symbol: 'AAPL',
			strike_price: 150,
			date_of_expiry: '01/19/2024',
			type: 'Cash Secured Put',
			premium: 120.66,
			collateral: 15000
		};
		
		chai.request(app)
		.post('/option/add')
		.send(newOption)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.equal("Option added successfully !!");
			done();
		});
	});
});

// FIXME: Abhishek add more DELETE tests
describe('Options DELETE API tests', () => {
	
});



after((done) => {
	mongoose.connection.close(() => {
		done();
	});
});