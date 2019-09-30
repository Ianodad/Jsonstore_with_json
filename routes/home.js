const express = require('express');
const router = express.Router();

// Home page //
router.get('/', (req, res) => res.render('index', {
    title: 'JsonStore Home',
    style: 'home.css'
}));
module.exports = router;