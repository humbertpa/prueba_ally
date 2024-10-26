const express = require('express');
const router = express.Router();
const UserRoutes = require('./usuario');
const ClientRoutes = require('./cliente');

//router.use('',express.json());
router.use(express.json());

router.use('/usuario',UserRoutes);
router.use('/cliente',ClientRoutes);

module.exports = router;