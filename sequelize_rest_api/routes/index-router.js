// Main router entry point, sets up all route modules

const express = require('express');
const router = express.Router();

// const indexRouter = require('./indexRouter');
const restaurantsRouter = require('./restaurants-router');
const menusRouter = require('./menus-router');
const menuItemsRouter = require('./menu-items-router');

router.use('/', restaurantsRouter);
router.use('/', menusRouter);
router.use('/', menuItemsRouter);


module.exports = router;