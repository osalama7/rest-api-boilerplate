'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const MongoAdapter = require('../mongodb-adapter');
const should = chai.should();
const Config = require('../../../config/config.json').env.test;

describe('Mongodb Adapter', () => {

	beforeEach((done) => {
		done();
	});

	describe('Connect to mongodb', () => {
		it('It should connect to db', async (done) => {
			await MongoAdapter
					.connect()
					.catch((err) => {
						console.log(err);
			});

			MongoAdapter.connection.db.should.be.ok;
			MongoAdapter.connection.db.should.be.a('object');
			done();
		});
	});

});