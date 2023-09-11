const express = require('express');
const router = express.Router();
const { login, getAdmins, createAdmin, status, deleteAdmin } = require('../controllers/Admin');

// admin login
router.post("/login", login);
router.get('/admin-list', getAdmins);
router.post('/create-admin', createAdmin);
router.post('/active-admin', status);
router.post('/delete/:id', deleteAdmin);


module.exports = router;