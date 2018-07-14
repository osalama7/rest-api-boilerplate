const colors = require('colors');
const http =  require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const djv = require('djv');
const compression = require('compression');
const session = require('express-session');

const Routes = require('./api/src/routes/index');
const MongoStore = require('connect-mongo')(session);
const MongoAdapter = require('./api/src/mongodb-adapter');

const api = require('./api/src/index');


const Config = process.env.NODE_ENV === 'test'
		? require('./config/config.json').env.test
		: require('./config/config.json').env.dev;
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



app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));



app.use('/', Routes);

app.get('/', async (req, res) => {
	res.status(200).send('Running');
});

app.listen(Config.port, async () => {
	await MongoAdapter.connect();

	let mongoStore = new MongoStore({ db: MongoAdapter.connection.db });

	app.use(session({
		secret: 'foo cat',
		saveUninitialized: false, // don't create session until something stored
		resave: false, //don't save session if unmodified
		store: mongoStore
	}));

	console.log(colors.green(`Rest Boilerplate running: ${Config.port}! Build something amazing!`));
});





module.exports = { app } ;



