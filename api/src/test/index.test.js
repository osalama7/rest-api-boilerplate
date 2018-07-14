'use strict';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const should = chai.should();

chai.use(chaiHttp);

describe('NodeServer', () => {

	beforeEach((done) => {

		done();
	});

	describe('Run http server and test route', () => {
		it('it should reach server', (done) =>{
			chai.request(server.app)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
});