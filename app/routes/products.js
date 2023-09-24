const express = require('express');
const router = express.Router();
const { 
  login, 
} = require('../controllers/Admin');
const products = require("../controllers/Products/Products")


router.get("/pizza", products.pizzas.get);
router.post("/pizza", products.pizzas.create);
router.put("/pizza", products.pizzas.update);
router.delete("/pizza", products.pizzas.delete);

router.get("/varient", products.varients.get);
router.post("/varient", products.varients.create);
router.put("/varient", products.varients.update);
router.delete("/varient", products.varients.delete);

router.get("/category", products.categories.get);
router.post("/category", products.categories.create);
router.put("/category", products.categories.update);
router.delete("/category", products.categories.delete);

// extra 
router.get("/cheese", products.extra.cheese.get);
router.get("/crust-type", products.extra.crust_type.get);
router.get("/sauce", products.extra.sauce.get);
router.get("/toppings", products.extra.toppings.get);
router.get("/veggies", products.extra.veggies.get);

module.exports = router;