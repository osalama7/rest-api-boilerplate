'use strict';

const colors = require('colors');

const Config = require('../../../../config/config.json');
const MongoAdapter  = require('../../../../api/src/mongodb-adapter');
const ObjectId = require('mongodb').ObjectId;
const Person = require('../../models/schemas/person.json');
const _ = require('lodash');
const server = require('./../../../../server');


let personCollection = {};
let tempConnection = async () => {
	let connection = await MongoAdapter.connect();
	personCollection = await connection.db(Config.env.dev.mongodb.dbName).collection('person');
};

tempConnection();
module.exports.getAllPersons = async ( ) => {
	let result = [];
	result = await personCollection.find();
	return (result.toArray());
};


module.exports.addPerson = async ( person ) => {
	let result = {};

		result = await personCollection
			.insertMany([person])
			.catch((error) => {
				console.error(colors.red(`Failed to insert document ${error}`));
		});

	return result;
};
module.exports.getPersonById = async ( personId ) => {
	let result = {};

	let query = {"_id": new ObjectId( personId )};

	result = await personCollection
			.find(query)
			.toArray();

	return result;
};

module.exports.deletePersonById = async ( personId ) => {
	let result = {};

	let query = {"_id": new ObjectId( personId )};

	result = await personCollection
			.deleteOne(query);


	return result;
};

