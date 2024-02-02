const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

let appleOption = {
	symbol: 'AAPL',
	strike_price: 150,
	date_opened: '01/10/2024',
	date_of_expiry: '01/19/2024',
	type: 'Cash Secured Put',
	premium: 120.66,
	collateral: 15000
};

const riotOption = {
	symbol: 'RIOT',
	strike_price: 9.5,
	date_opened: '01/10/2024',
	date_of_expiry: '01/28/2024',
	type: 'Cash Secured Put',
	premium: 35.94,
	collateral: 950
};

const riotOption2 = {
	symbol: 'RIOT',
	strike_price: 14,
	date_opened: '01/10/2024',
	date_of_expiry: '05/15/2024',
	type: 'Buy Call',
	premium: 220.34,
	collateral: 1700
};

describe('Options GET API tests on empty database', () => {
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



describe('Options POST API tests', () => {
	let appleOptionId;
	it('POST /option/ AAPL test 1', (done) => {
		chai.request(app)
		.post('/option/add')
		.send(appleOption)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('optionId');
			expect(res.body).to.have.property('message');
			const message = res.body.message;
			appleOptionId = res.body.optionId;
			expect(message).to.equal("Option added successfully !!");
			done();
		});
	});

	it('POST /option/ RIOT test 1', (done) => {
		chai.request(app)
		.post('/option/add')
		.send(riotOption)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('optionId');
			expect(res.body).to.have.property('message');
			const message = res.body.message;
			const newOptionId = res.body.optionId;
			expect(message).to.equal("Option added successfully !!");
			done();
		});
	});

	let riotOptionId;
	it('POST /option/ RIOT test 2', (done) => {
		chai.request(app)
		.post('/option/add')
		.send(riotOption2)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('optionId');
			expect(res.body).to.have.property('message');
			const message = res.body.message;
			riotOptionId = res.body.optionId;
			expect(message).to.equal("Option added successfully !!");
			done();
		});
	});

	let updatedRiotOption = {
		symbol: 'RIOT',
		strike_price: 16,
		date_of_expiry: '07/12/2024',
		date_closed: '07/12/2024',
		type: 'Buy Call',
		premium: 227.65,
		collateral: 1700,
		is_open : true
	};
	it('POST /option/update/:id RIOT test', (done) => {
		chai.request(app)
		.post(`/option/update/${riotOptionId}`)
		.send(updatedRiotOption)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('optionId');
			expect(res.body).to.have.property('message');
			const message = res.body.message;
			expect(message).to.equal("Option updated successfully !");
			done();
		});
	});

	updatedRiotOption.is_open = false;
	updatedRiotOption.date_of_expiry = '06/22/2024';
	it('POST /option/update/:id RIOT option closed test', (done) => {
		chai.request(app)
		.post(`/option/update/${riotOptionId}`)
		.send(updatedRiotOption)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('optionId');
			expect(res.body).to.have.property('message');
			const message = res.body.message;
			expect(message).to.equal("Option updated successfully !");
			done();
		});
	});

	it('POST /option/ AAPL test 2 - Invalid Option Type', (done) => {
		appleOption.type = 'Sell Naked Put'
		chai.request(app)
		.post('/option/add')
		.send(appleOption)
		.end((err, res) => {
			expect(res).to.have.status(400);
			done();
		});
	});
});



describe('Options DELETE API tests', () => {
	let newOptionId;
	it('DELETE /option/:id', (done) => {
		const newOption = {
			symbol: 'AMZN',
			strike_price: 130,
			date_opened: '03/01/2024',
			date_of_expiry: '03/19/2024',
			type: 'Covered Call',
			premium: 70,
			collateral: 13000
		};
		
		chai.request(app)
		.post('/option/add')
		.send(newOption)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('optionId');
			expect(res.body).to.have.property('message');
			const message = res.body.message;
			expect(message).to.equal("Option added successfully !!");
			newOptionId = res.body.optionId;

			chai.request(app)
				.delete(`/option/${newOptionId}`)
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.equal("Option deleted !!");
					done();
				});
		});
	});
});



describe('Options GET API tests', () => {
	it('GET /option/', (done) => {
		chai.request(app)
		.get('/option/')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.be.equal(3);
			done();
		});
	});

	it('GET /option/open', (done) => {
		chai.request(app)
		.get('/option/open')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.be.equal(2);
			done();
		});
	});

	it('GET /option/closed', (done) => {
		chai.request(app)
		.get('/option/closed')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.be.equal(1);
			done();
		});
	});

	it('GET /option/open/:symbol', (done) => {
		chai.request(app)
		.get('/option/open/RIOT')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.be.equal(1);
			done();
		});
	});

	it('GET /option/closed/:symbol', (done) => {
		chai.request(app)
		.get('/option/closed/RIOT')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			expect(res.body.length).to.be.equal(1);
			done();
		});
	});

	it('GET /option/:id', (done) => {
		let newOptionId;
		chai.request(app)
		.post('/option/add')
		.send(riotOption)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('optionId');
			expect(res.body).to.have.property('message');
			const message = res.body.message;
			newOptionId = res.body.optionId;
			expect(message).to.equal("Option added successfully !!");

			chai.request(app)
			.get(`/option/${newOptionId}`)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.symbol).to.equal('RIOT');
				expect(res.body.strike_price).to.equal(9.5);
				expect(res.body.type).to.equal('Cash Secured Put');
				expect(res.body.premium).to.equal(35.94);
				expect(res.body.collateral).to.equal(950);
				expect(res.body.is_open).to.equal(true);
				expect(res.body.realized_gain_loss).to.equal(0);
				done();
			});
		});
	});
});



after((done) => {
	mongoose.connection.close(() => {
		done();
	});
});