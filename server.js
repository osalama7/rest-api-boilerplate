const http =  require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression =require('compression');

const colors = require('colors');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const api = require('./api/src/index');
const MongoAdapter = require('./api/src/mongodb-adapter');

const Config = require('./config/config.json');
const app = new express();


let mongoConnection = {};

let MongoClient = function () {
	return MongoAdapter.connect()
			.then( connection => {
			return connection.db(Config.mongodb.dbName);
			}).catch( (err) =>{
			console.log(err);
		});
};



app.use(session({
	secret: 'foo',
	store: new MongoStore({ dbPromise: MongoClient() }),
	resave: false, //don't save session if unmodified
	saveUninitialized: false,
}));
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen( process.env.NODE_ENV === 'test' ? Config.testPort: Config.port , (error) => {
	if (!error) {
		console.log(colors.yellow(`RestfulBoilerplate running: ${Config.port}! Build something amazing!`));
	}
});

module.exports = { app };