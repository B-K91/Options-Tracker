const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Options GET API tests', () => {
	it('should get all options', (done) => {
		chai.request(app)
		.get('/option/')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			done();
		});
	});
	
	it('should get all options 1', (done) => {
		chai.request(app)
		.get('/option/')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			done();
		});
	});
	
	it('should get all options 2', (done) => {
		chai.request(app)
		.get('/option/')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			done();
		});
	});
});

describe('Options POST API tests', () => {
	it('should get all options', (done) => {
		chai.request(app)
		.get('/option/')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			done();
		});
	});
});

describe('Options POST API tests', () => {
	it('should get all options', (done) => {
		chai.request(app)
		.get('/option/')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			done();
		});
	});
});





after((done) => {
	mongoose.connection.close(() => {
		done();
	});
});