const express = require('express');

const Router = express.Router();
const colors = require('colors');
const jwt = require('jsonwebtoken');

const Config = process.env.NODE_ENV === 'test'
		? require('../../../config/config.json').env.test
		: require('../../../config/config.json').env.dev;


module.exports = Router.use((req, res, next) => {
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

