'use strict';
const MongoClient = require('mongodb').MongoClient;
const Config = require('../../config/config.json');
const assert = require('assert');
const colors = require('colors');



// Initialize Mongodb
module.exports.connect = async () => {
	let db = {};
	db = await MongoClient
			.connect(Config.env.dev.mongodb.url, {})
			.then( connection => {
				return connection;
			})
			.catch(function (err) {
				console.error(colors.red('Could not connect to MongoDB!'));
				console.log(err);
			});
	return db;
};

module.exports.disconnect = (cb) => {
	return MongoClient.connection.db
			.close( (err) => {

				console.info(colors.yellow('Disconnected from MongoDB'));

				return cb(err);
			});
};