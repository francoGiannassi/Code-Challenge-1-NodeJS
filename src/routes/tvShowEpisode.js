const express = require('express');
const router = express.Router();
const TvShowEpisodeController = require('../controllers/tvShowEpisodeController')

router.get('/api/episode/:id', TvShowEpisodeController.getOneByID);
router.get('/api/episode', TvShowEpisodeController.getOneBy);

module.exports = router;