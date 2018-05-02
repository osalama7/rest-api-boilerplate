'use strict';
const version = 1.0;
const Router = require('express');
const config = require('../../config/config');

module.exports = () => {
    
    let api = Router();
    // mount the facets resource
    api.use('/', 'hello from API');
    
    // perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({ version });
});
    
    return api;
};

