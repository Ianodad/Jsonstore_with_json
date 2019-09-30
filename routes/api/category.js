const express = require('express');
const router = express.Router();


// Get category service
const Category = require('../../services/Category');
const Products = require('../../services/Products');

// Get all Products
router.get('/', (req, res) => res.json(Category));

// Get product
router.get('/:id', (req, res) => {

    // check if id is equal to the id number
    const category = Category.some((category) => category._id === parseInt(req.params.id));
    // checks if category is not true return 404 error else return user information
    !category ?
        res.status(404).send('category not found') :
        res.send(Category.filter((category) => category._id === parseInt(req.params.id)));
});

router.get('/:id/products', (req, res) => {
    // check if id is equal to the index number
    const product = Products.some((product) => product.categoryId === parseInt(req.params.id));

    // console.log(product)
        // checks if product is not true return 404 error else return user information
        !product ?
        res.status(404).send('product not found') :
        res.send(Products.filter((product) => product.categoryId === parseInt(req.params.id)));
});

module.exports = router;