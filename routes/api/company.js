const express = require('express');
const router = express.Router();

// Get user service
const Companies = require('../../services/Company');
const Products = require('../../services/Products');


// Get all Company
router.get('/', (req, res) => res.json(Companies));

// Get product
router.get('/:id', (req, res) => {
    // check if id is equal to the index number
    const company = Companies.some((company) => company._id === parseInt(req.params.id));
    // checks if company is not true return 404 error else return user information
    !company ?
        res.status(404).send('Company not found') :
        res.send(Companies.filter((company) => company._id === parseInt(req.params.id)));
});

router.get('/:id/products', (req, res) => {
    // check if id is equal to the index number
    const company = Companies.some((company) => company._id === parseInt(req.params.id));


    // console.log(company)
    // checks if comment is not true return 404 error else return user information
    !company ?
        res.status(404).send('company not found') :
        res.send(Products.filter((product) => product.companyId === parseInt(req.params.id)));
});

module.exports = router;