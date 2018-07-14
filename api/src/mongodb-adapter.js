'use strict';
const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');
const colors = require('colors');

const Config = process.env.NODE_ENV === 'test'
		? require('./../../config/config.json').env.test
		: require('./../../config/config.json').env.dev;
const connection = {};
// Initialize Mongodb
module.exports.connect = async () => {
	await MongoClient
			.connect(Config.mongodb.url, {})
			.then( async db => {
				connection.db = await db.db(Config.mongodb.dbName)

			})
			.catch(function (err) {
				console.error(colors.red('Could not connect to MongoDB!'));
				console.log(err);
			});


};

module.exports.disconnect = (connection,  cb) => {
	return connection.db
			.close( (err) => {
				console.info(colors.yellow('Disconnected from MongoDB'));
				return cb(err);
			});
};




module.exports.connection  = connection;
