const express = require('express');
const router = express.Router();

// Get user service
const Products = require('../../services/Products');
const Users = require('../../services/Users');
const Comments = require('../../services/Comments');

// Get all Products
router.get('/', (req, res) => res.json(Products));

// Get product
router.get('/:id', (req, res) => {
    // check if id is equal to the index number
    const product = Products.some((product) => product._id=== parseInt(req.params.id));
    // checks if product is not true return 404 error else return user information
    !product ?
        res.status(404).send('Product not found') :
        res.send(Products.filter((product) => product._id === parseInt(req.params.id)));
});

router.get('/:id/comments', (req, res) => {
    // check if id is equal to the index number
    const product = Products.filter((product) => product._id === parseInt(req.params.id));
    const comments = Comments.some((comment) => product[0]._id === comment.productId);

    // console.log(comments)
    // checks if comment is not true return 404 error else return user information
    !comments ?
        res.status(404).send('comment not found') :
        res.send(Comments.filter((comment) => product[0]._id === comment.productId));
});

module.exports = router;