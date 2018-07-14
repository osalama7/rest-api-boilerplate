'use strict';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const should = chai.should();
const PersonController = require('./../../../services/src/controllers/index').PersonController;
const mongodb = require('../mongodb-adapter');

chai.use(chaiHttp);

describe('Person Api', async () => {
	await mongodb.connect();
	let testSample = {};

	beforeEach( async (done) => {
		testSample = await PersonController.getOneRandomPerson(1, mongodb.connection.db).catch((err) => {
			console.log(err);
		});
		done();
	});

	describe('Run http server and test Persons route', () => {
		it('it get all persons', async (done) => {

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

		it('it should get a person by Id', async (done) => {
			chai.request(server.app)
					.get('/person/' + testSample._id)
					.end((err, res) => {

						res.should.have.status(200);
						done();
					})
		});

		it.only('it should delete a person by Id', async (done) => {
			chai.request(server.app )
					.delete('/person/' + testSample._id)
					.end((err, res) => {
						res.should.have.status(200);
						done();
					})
		});


	});

});