'use strict';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const should = chai.should();
const PersonController = require('./../../../services/src/controllers/index').PersonController;

chai.use(chaiHttp);

describe('Person Api', () => {
let testSample = {};

	beforeEach( async (done) => {
		testSample = await PersonController.getOneRandomPerson(1);

	});

	describe('Run http server and test Persons route', () => {
		it.skip('it get all persons', async (done) =>{

			chai.request(server.app)
					.get('/persons')
					.end((err, res) => {
						res.should.have.status(200);
						done();
					});
		});

		it('it should Add a person', async (done) => {
			chai.request(server.app)
					.post('/person')
					.send({
						"foo": "bar" + Math.random()
					})
					.end((err,  res) => {
						res.should.have.status(200);
						done();
					});
		});

		it('it should update a person', async (done) => {

			chai.request(server.app)
					.put('/person/' + testSample._id)
					.type('form')
					.send({ "foo":"bar" })
					.end((err, result) => {
						result.should.have.status(200);
						result.res.body.nModified.should.be.equal(1);
						done();
				});

		});

		it('it should delete a person by Id', async (done) =>{
			chai.request(server.app )
					.delete('/person/' + testSample._id)
					.end((result) => {
						res.should.have.status(200);
						done();
					})
					.catch((err) => {
					});
		});

		it.skip('it should get a person by Id', async (done) =>{
			chai.request(server.app)
					.get('/person/' + testSample._id)
					.end((res) => {
						console.log({res});
						res.should.have.status(200);
						done();
					})
					.catch((err) => {

					});
		});
	});

});