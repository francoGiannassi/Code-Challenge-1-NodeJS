const express = require('express');
const router = express.Router();
const ActorController = require('../controllers/actorController');

router.post('/api/createActor', ActorController.create);

module.exports = router;