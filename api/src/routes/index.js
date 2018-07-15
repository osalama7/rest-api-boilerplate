'use strict';
const Person = require('./route-persons');
const User = require('./route-users');
const AuthetnicateUser = require('./authenticate-middleware');
module.exports = [User, Person];