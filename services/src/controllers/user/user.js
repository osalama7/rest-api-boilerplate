'use strict';

const Config = process.env.NODE_ENV === 'test'
		? require('./../../../../config/config.json').env.test
		: require('./../../../../config/config.json').env.dev;

const colors = require('colors');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ObjectId = require('mongodb').ObjectId;
const user = require('../../models/schemas/user.json');
const _ = require('lodash');

let getAllUsers = async (db) => {

	let UserCollection = await db.collection('user');
	let result;
	result = await UserCollection.find().toArray();

	return (result);
};

let getOneRandomUser = async (limit, db,) => {
	let result;
	let UserCollection = await db.collection('user');
	result = await UserCollection.find().limit(limit).toArray();

	return(result[0]);
};

let getAllUsersCursor = async (db) => {
	let UserCollection = await db.collection('user');
	let result;

	result = await UserCollection.find();
	return (result.toArray());
};

let registerUser = async ( user, db ) => {
	let UserCollection = await db.collection('user');
	let result = {};
	let hashedPassword = bycrypt.hashSync(user.password, 8);

	user.password = hashedPassword;
		await UserCollection
			.insertMany([user])
			.then((userId) => {
			result.token = jwt.sign({id: userId.insertedIds[0]}, Config.passSecret, {
					expiresIn: Config.tokenExpiresIn
				});
			})
			.catch((error) => {
				console.error(colors.red(`Failed to insert document ${error}`));
		});

	return result;
};
	/**
	* @deprecated
 	*/
let getUserById = async ( userId, db ) => {
	let UserCollection = await db.collection('user');
	let result = {};

	let query = {"_id": new ObjectId( userId )};
	result = await UserCollection
			.find(query)
			.toArray()
			.catch((err) => {
				console.error(colors.red(`Failed to find document ${ err }`));
			});


	return result;
};

let updateUserById = async ( userId, userToUpdate, db ) => {
	let UserCollection = await db.collection('user');
	let result = {};
	let updatePayload = {$set: userToUpdate };
	let query = {"_id": new ObjectId( userId )};

	result = await UserCollection
			.updateOne(query,  updatePayload)
			.catch((err) => {
				console.error(colors.red(`Failed to update document ${ err }`));
	});
	return result;
};

let deleteUserById = async ( userId, db ) => {
	let UserCollection = await db.collection('user');
	let result = {};

	let query = {"_id": new ObjectId( userId )};

	result = await UserCollection
			.deleteOne(query)
			.catch((err) => {
				console.error(colors.red(`Failed to delete document ${ err }`));
			});


	return result;
};

module.exports = { getAllUsers, getOneRandomUser, registerUser, getUserById, deleteUserById, updateUserById };