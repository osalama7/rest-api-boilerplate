'use strict';

const Config = process.env.NODE_ENV === 'test'
		? require('./../../../../config/config.json').env.test
		: require('./../../../../config/config.json').env.dev;

const colors = require('colors');
const ObjectId = require('mongodb').ObjectId;
const Person = require('../../models/schemas/person.json');
const _ = require('lodash');

let getAllPersons = async (db) => {

	let PersonCollection = await db.collection('person');
	let result;
	result = await PersonCollection.find().toArray();

	return (result);
};

let getOneRandomPerson = async (limit, db,) => {
	let result;
	let PersonCollection = await db.collection('person');
	result = await PersonCollection.find().limit(limit).toArray();

	return(result[0]);
};

let getAllPersonsCursor = async (db) => {
	let PersonCollection = await db.collection('person');
	let result;

	result = await PersonCollection.find();
	return (result.toArray());
};

let addPerson = async ( person, db ) => {
	let PersonCollection = await db.collection('person');
	let result = {};

		result = await PersonCollection
			.insertMany([person])
			.catch((error) => {
				console.error(colors.red(`Failed to insert document ${error}`));
		});

	return result;
};

let getPersonById = async ( personId, db ) => {
	let PersonCollection = await db.collection('person');
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

let updatePersonById = async ( personId, personToUpdate, db ) => {
	let PersonCollection = await db.collection('person');
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

let deletePersonById = async ( personId, db ) => {
	let PersonCollection = await db.collection('person');
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