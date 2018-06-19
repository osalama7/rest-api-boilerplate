'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const Config = require('../../../config/config.json');
const PersonController = require('../../src/controllers/person/person');

const should = chai.should();


describe('Person controller', () => {

	beforeEach( (done) => {

		done();
	});

	describe('Add a new person', () => {
		it('It should connect to db and add a new person', async (done) => {
			let result = await PersonController.addPerson({'foo':'bar'});
			expect(result).to.be.ok;
			expect(result).to.be.an('object');

			done();
		});
	});
	describe('Find all persons', () => {
		it('It should connect to db get all persons', async (done) => {
			let result = await PersonController.getAllPersons();
			expect(result).to.be.an('Array');

			done();
		});
	});

});