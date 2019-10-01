const express = require('express');
const router = express.Router();


// Get user service
const users = require('../services/Users');
const products = require('../services/Products')
const comments = require('../services/Comments')
const category = require('../services/Category')
const company = require('../services/Company')




// Store page 
router.get('/', (req, res) => {

    // shorting the list
    const Users = users.slice(0, 3)
    const Products = products.slice(0, 3)
    const Comments = comments.slice(0, 3)
    const Category = category.slice(0, 3)
    const Company = company.slice(0, 3)



    res.render('store', {
        title: 'Store View',
        style: 'store.css',
        Users,
        Products,
        Comments,
        Category,
        Company

    })
})

module.exports = router;