'use strict';

const colors = require('colors');
const mongodbServer = require('mongodb-core').Server;
const Config = require('../../../../config/config.json');
const MongoAdapter  = require('../../../../api/src/mongodb-adapter');
const ObjectId = require('mongodb').ObjectId;
const Person = require('../../models/schemas/person.json');
const _ = require('lodash');
const server = require('./../../../../server');



let PersonCollection = {};
let tempConnection = async () => {
	let connection = await MongoAdapter.connect();
	PersonCollection = await connection.db(Config.env.dev.mongodb.dbName).collection('person');
};

tempConnection();

let getAllPersons = async () => {

	let result = [];
	try {
		result = await PersonCollection.find().toArray();
	} catch (err) {
		console.log({err})
	}


	return (result);
};

let getOneRandomPerson = async (limit) => {
	let result = {};
	result = await PersonCollection.find().limit(limit).toArray();

	return(result[0]);
};

// let getAllPersonsCursor = async ( ) => {
// 	let result = [];
// 	let cursor =
// 	result = await PersonCollection.find();
// 	return (result.toArray());
// };

let addPerson = async ( person ) => {
	let result = {};

		result = await PersonCollection
			.insertMany([person])
			.catch((error) => {
				console.error(colors.red(`Failed to insert document ${error}`));
		});

	return result;
};

let getPersonById = async ( personId ) => {
	let result = {};

	let query = {"_id": new ObjectId( personId )};
	result = await PersonCollection
			.find(query)
			.toArray()
			.catch((err) => {
				console.error(colors.red(`Failed to find document ${ err }`));
			});


	return result;
};

let updatePersonById = async ( personId, personToUpdate ) => {

	let result = {};
	let updatePayload = {$set: personToUpdate };
	let query = {"_id": new ObjectId( personId )};

	result = await PersonCollection
			.updateOne(query,  updatePayload)
			.catch((err) => {
				console.error(colors.red(`Failed to update document ${ err }`));
	});
	return result;
};

let deletePersonById = async ( personId ) => {
	let result = {};

	let query = {"_id": new ObjectId( personId )};

	result = await PersonCollection
			.deleteOne(query)
			.catch((err) => {
				console.error(colors.red(`Failed to delete document ${ err }`));
			});


	return result;
};

module.exports = { getAllPersons, getOneRandomPerson, addPerson, getPersonById, deletePersonById, updatePersonById };