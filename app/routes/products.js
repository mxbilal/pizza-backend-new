const express = require('express');
const router = express.Router();
const { 
  login, 
} = require('../controllers/Admin');

//get
router.get("/all", login);

//post
router.post("/add-product", login);
router.post("/update-product", login);
router.delete("/add-product", login);




module.exports = router;