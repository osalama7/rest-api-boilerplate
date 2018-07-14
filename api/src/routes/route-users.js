'use strict';

const UserController = require('./../../../services/src/controllers/index').UserController;
const express = require('express');
const Router = express.Router();

const colors = require('colors');
const jwt = require('jsonwebtoken');

const Config = process.env.NODE_ENV === 'test'
		? require('../../../config/config.json').env.test
		: require('../../../config/config.json').env.dev;

const mongo = require('../mongodb-adapter').connection;

const  RoutePaths  = {
	user : {
		GetAllUsers: '/users',
		LoginUser: '/login',
		RegisterUser: '/register',
		DeleteUserById: '/user/:userId',
		UpdateUserById: '/user/:userId',
	}
};

Router.use((req, res, next) => {
	console.log(colors.yellow(Date.now()));
	next();
});

Router.get(RoutePaths.user.GetAllUsers, async (req, res, next) => {
	let users = await UserController.getAllUsers(mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get users${ err }`));
		res.status(500).send(err);
	});

	console.log(colors.blue(`Request handled successfully at path: ${ req.headers.host } fetched  ${ users.length } items`));
	res.status(200).send({ users });
	next();
});

Router.get(RoutePaths.user.LoginUser, async (req, res, next) => {
	let token = req.headers['x-access-token'];
	if (!token) {
		console.error(colors.red(`No Token provided for login`));
		res.status(401).send({auth: false,  message: colors.red(`No Token provided for login`)});
	}
	jwt.verify(token, Config.passSecret, (err, decoded) => {
		if (err) return res.status(500).send({ auth: false, message: colors.red(`Failed to authenticate provided token`) });
		res.status(200).send({auth: decoded, message: colors.green(`Authenticated successfully`)});
	});

	next();
});

Router.put(RoutePaths.user.UpdateUserById, async (req, res, next) => {

	let result = await UserController.updateUserById(req.params.userId, req.body, mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get users${ err }`));
		res.status(500).send(err);
	});
	console.log(colors.blue(`Request handled successfully at path: ${ req.headers.host } updated  ${ result } `));
	// console.log(`updated ${result.nModified}`);
	res.status(200).send(result);
	next();
});

Router.delete(RoutePaths.user.DeleteUserById, async (req, res, next) => {

	let result = await UserController.deleteUserById(req.params.userId, mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get users${ err }`));
		res.status(500).send(err);
	});
	console.log(colors.blue(`Request handled successfully at path: ${ req.headers.host } deleted  ${ result } `));

	res.status(200).send(result);
	next();
});

Router.post(RoutePaths.user.RegisterUser, async (req, res, next) => {

	let result = await UserController.registerUser(req.body, mongo.db).catch((err) => {
		console.error(colors.red(`Failed to get users${ err }`));
		res.status(500).send(err);
	});
	console.log(colors.blue(`User registered successfully : ${ JSON.stringify( result.token )}`));

	res.status(200).send(result);
	next();
});


module.exports = Router ;