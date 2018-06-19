'use strict';

const Ajv = require('ajv');

const Config = require('../../../../config/config.json');
const MongoAdapter  = require('../../../../api/src/mongodb-adapter');
const Person = require('../../models/schemas/person.json');
const _ = require('lodash');
let ajv = new Ajv({allErrors: true});

let person = {
	"properties": {
		"title" : {"type": "string"},
		"firstName" : {"type": "string"},
		"lastName" : {"type": "string"},
		"age" : {
			"type": "integer",
			"minimum": 0
		},
	}
};

let validate = ajv.compile(person);
console.log({validate});

module.exports.addPerson = async ( person ) => {
	let db = {};
	let result = {};

	await MongoAdapter
		.connect(Config.mongodb.url, {})
		.then( connection => {
			db = connection;
		})
		.catch(function (err) {
			console.error(colors.red(`Could not connect to MongoDB! ${err}`));
		});

		const mongodbDb = db.db(Config.mongodb.dbName);
		const personCollection = mongodbDb.collection('person');

		result = await personCollection
			.insertMany([person])
			.catch((error) => {
				console.error(colors.red(`Failed to insert document ${error}`));
		});

	return result;
};

module.exports.getAllPersons = async ( ) => {
	let db = {};
	let result = {};

	await MongoAdapter
			.connect(Config.mongodb.url, {})
			.then( connection => {
				db = connection;
			})
			.catch(function (err) {
				console.error(colors.red(`Could not connect to MongoDB! ${err}`));
			});

	const mongodbDb = db.db(Config.mongodb.dbName);
	const personCollection = mongodbDb.collection('person');

	result = await personCollection.find();


	return (result.toArray());
};