'use strict';

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

	describe('update a person', () => {
		it('It should connect to db add a new person, and update it', async (done) => {
			let addingResult = await PersonController.addPerson({foo:"bar"});
			let updatedResult = await PersonController.updatePersonById(addingResult.ops[addingResult.ops.length - 1 ]._id, {"foo": "value"});

			expect(updatedResult.matchedCount).to.equal(1);
			expect(updatedResult.modifiedCount).to.equal(1);
			expect(updatedResult).to.be.an('object').that.is.not.empty;
			done();
		});
	});

	describe('Delete one person', () => {
		it('It should connect to db add a new person, and delete it', async (done) => {
			let addingResult = await PersonController.addPerson({'foo':'bar'});
			let deletedResult = await PersonController.deletePersonById(addingResult.ops[addingResult.ops.length - 1 ]._id);

			expect(deletedResult.deletedCount).to.equal(1);
			done();
		});
	});

});