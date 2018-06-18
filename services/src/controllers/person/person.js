'use strict';

const Ajv = require('ajv');

const Config = require('../../../../config/config.json');
const MongoAdapter  = require('../../../../api/src/mongodb-adapter');
const Person = require('../../models/schemas/person.json');
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
	MongoAdapter.connect().then((mClient) => {
		db = mClient.db(Config.mongodb.dbName);
		db.collection("person").add(person, (result) => {
			console.log({result});
			return result;
		})
	});
};
