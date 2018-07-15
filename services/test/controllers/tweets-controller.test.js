'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const Config = require('../../../config/config.json');
const TweetsController = require('../../src/twitter-graph-hackathon/index');
const mongodb = require('../../../api/src/mongodb-adapter');

const should = chai.should();

console.log(TweetsController);
describe('TweetsController', async () => {
	await mongodb.connect();
	beforeEach( done => {
		done();
	});

	describe('Get tweets cursor', () => {
		it.only('It should connect to db get events tweets', async (done) => {

			console.log(mongodb.connection.db);
			let result = await TweetsController.CursorfindFilteredTweets(mongodb.connection.db);
			console.log(result);
			expect(result).not.to.be.an('undefined');

		});
	});
});