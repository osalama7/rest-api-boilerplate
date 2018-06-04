const http =  require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const api = require('./api/src/index');

const config = require('./config/config.json');


let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware


app.use(bodyParser.json({
    limit : config.bodyLimit
}));

console.log({config});

console.log(typeof api);
// api router

app.use('/', api({ config }));

initialize( () => {
    
    let middleware = (item) => {
        let routes = express();
        return routes;
    };
    
    app.use(middleware({ config }));
    // api router
    app.use('/', api({ config }));
    
    app.server.listen(process.env.PORT || config.port, () => {
        console.log(`Started on port ${app.port}`);
    });
});

module.exports = app;
