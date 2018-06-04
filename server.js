const http =  require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const api = require('./api/src/index');
const compression =require('compression');
const colors = require('colors');

const Config = require('./config/config.json');
const app = new express();

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(Config.port, (error) => {
	if (!error) {
		console.log(colors.yellow(`RestfulBoilerplate running: ${Config.port}! Build something amazing!`));
	}
});