const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// admin login
router.post('/login', adminController.login);
router.get('/getAdmins', adminController.getAdmins);
router.post('/createAdmin', adminController.createAdmin);
router.post('/status/:id', adminController.status);
router.post('/delete/:id', adminController.delete);


module.exports = router;