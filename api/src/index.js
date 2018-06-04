'use strict';

const { Router } = require('express') ;
const router = new Router();
const version = 1.0;

const config = require('../../config/config');


function getPosts (req, res) {
res.status(200).send('hello');
};



// Get all Posts
router.route('/').get(getPosts);

// Get one post by cuid
checkSpacingForModuleDeclaration
export router;
