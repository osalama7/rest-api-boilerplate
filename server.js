const http =  require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression =require('compression');

const colors = require('colors');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const djv = require('djv');

const api = require('./api/src/index');
const MongoAdapter = require('./api/src/mongodb-adapter');

const Config = require('./config/config.json');
const app = new express();

const env = djv({
	version: 'draft-06', // use json-schema draft-06
	formats: { /*...*/ }, // custom formats @see #addFormat
	errorHandler: () => { /*...*/ }, // custom error handler, @see #setErrorHandler
});

//todo add all schemas and validate
const PersonSchema = require('./services/src/models/schemas/person.json');


env.addSchema('test', PersonSchema);
env.validate('test#/common', { type: 'common' });

let mongoStore = new MongoStore({ dbPromise: MongoAdapter.connect() });

app.use(session({
	secret: 'foo cat',
	saveUninitialized: false, // don't create session until something stored
	resave: false, //don't save session if unmodified
	store: mongoStore
}));

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen( process.env.NODE_ENV === 'test' ? Config.env.test.port: Config.env.dev.port , (error) => {
	if (!error) {
		console.log(colors.yellow(`Rest Boilerplate running: ${Config.env.dev.port}! Build something amazing!`));
	}
});

module.exports = { app, mongoStore };