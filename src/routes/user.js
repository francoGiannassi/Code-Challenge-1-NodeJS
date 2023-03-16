const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/api/login', AuthController.logIn);
router.post('/api/signup', AuthController.signUp);
router.post('/api/refresh', AuthController.refreshToken);
  
module.exports = router;