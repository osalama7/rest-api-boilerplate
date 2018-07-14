'use strict';

const PersonController = require('./../../../services/src/controllers/index').PersonController;
const express = require('express');
const Router = express.Router();
const colors = require('colors');
;
const Config = process.env.NODE_ENV === 'test'
		? require('../../../config/config.json').env.test
		: require('../../../config/config.json').env.dev;

const mongo = require('../mongodb-adapter').connection;

const  RoutePaths  = {
	person : {
		GetAllPersons: '/persons',
		GetPersonById: '/person/:personId',
		AddPerson: '/person',
		DeletePersonById: '/person/:personId',
		UpdatePersonById: '/person/:personId',
	}
};

Router.use((req, res, next) => {
	console.log(colors.yellow(Date.now()));
	next();
});

Router.get(RoutePaths.person.GetAllPersons, async (req, res, next) => {
	let persons = await PersonController.getAllPersons(mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get persons${ err }`));
		res.status(500).send(err);
	});

	console.log(colors.blue(`Request handled successfully at path: ${ req.headers.host } fetched  ${ persons.length } items`));
	res.status(200).send({ persons });
	next();
});

Router.get(RoutePaths.person.GetPersonById, async (req, res, next) => {

	let person = await PersonController.getPersonById(req.params.personId, mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get persons${ err }`));
		res.status(500).send(err);
	});
	console.log(colors.blue(`Request handled successfully at path: ${ req.headers.host } fetched  ${ person } `));
	res.status(200).send(person);
	next();
});

Router.put(RoutePaths.person.UpdatePersonById, async (req, res, next) => {

	let result = await PersonController.updatePersonById(req.params.personId, req.body, mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get persons${ err }`));
		res.status(500).send(err);
	});
	console.log(colors.blue(`Request handled successfully at path: ${ req.headers.host } updated  ${ result } `));
	// console.log(`updated ${result.nModified}`);
	res.status(200).send(result);
	next();
});

Router.delete(RoutePaths.person.DeletePersonById, async (req, res, next) => {

	let result = await PersonController.deletePersonById(req.params.personId, mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get persons${ err }`));
		res.status(500).send(err);
	});
	console.log(colors.blue(`Request handled successfully at path: ${ req.headers.host } deleted  ${ result } `));

	res.status(200).send(result);
	next();
});

Router.post(RoutePaths.person.AddPerson, async (req, res, next) => {

	let result = await PersonController.addPerson(req.body, mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get persons${ err }`));
		res.status(500).send(err);
	});
	console.log(colors.blue(`Added ${result.insertedCount } person Id(s): ${ JSON.stringify( result.insertedIds )}`));

	res.status(200).send(result);
	next();
});


module.exports = Router ;