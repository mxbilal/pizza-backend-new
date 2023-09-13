const express = require('express');
const router = express.Router();
const { login, getAdmins, createAdmin, status, deleteAdmin, forgetPassword, updatePassword } = require('../controllers/Admin');

// admin login
router.post("/login", login);
router.get('/admin-list', getAdmins);
router.post('/create-admin', createAdmin);
router.post('/active-admin', status);
router.post('/delete/:id', deleteAdmin);

router.post('/forget-password', forgetPassword);
router.post('/update-password', updatePassword);

module.exports = router;