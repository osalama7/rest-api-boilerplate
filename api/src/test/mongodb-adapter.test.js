'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const MongoAdapter = require('../mongodb-adapter');
const should = chai.should();


describe('Mongodb Adapter', () => {

	beforeEach((done) => {

		done();
	});

	describe('Connect to mongodb', () => {
		it('It should connect to db', async (	done) => {
			let connection = await MongoAdapter
					.connect()
					.catch((err) => {
						console.log(err);
			});
			const db = await connection
					.db('test');
			db.should.be.ok;
			done();
		});
	});

});