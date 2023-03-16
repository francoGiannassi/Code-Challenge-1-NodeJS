const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movieController');

router.get('/api/movies', MovieController.getBy);

module.exports = router;
