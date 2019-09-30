const express = require('express');
const router = express.Router();
const Joi = require('joi');


// Get user service
const Users = require('../../services/Users');
const Products = require('../../services/Products');
const Comments = require('../../services/Comments');


// Get all users
router.get('/', (req, res) => res.json(Users))

// Get Single Member 
router.get('/:id', (req, res) => {
    // check is id is equal to the index number
    const user = Users.some(user => user._id === parseInt(req.params.id));

    // checks if user is not true return 404 error else return user information  
    !user ?
        res.status(404).send('User not found') :
        res.send(Users.filter(user => user._id === parseInt(req.params.id)))

})

router.post('/', (req, res) => {

    // Joi schema to set prerequisites  of content 
    const schema = {
        age: Joi.number().required(),
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        gender: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
        address: Joi.string().min(5).required(),
        about: Joi.string().min(5).required()
    }

    const options = {
        abortEarly: false
    };

    // check validation againt  the schema
    const result = Joi.validate(req.body, schema, options)


    const newUser = {
        _id: Users.length,
        picture: "http://placehold.it/42x42",
        age: req.body.age,
        name: {
            first: req.body.firstName,
            last: req.body.lastName
        },
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        about: req.body.about,
        registered: Date(Date.now())
    }

    if (result.error)(res.status(400).send(result.error.details.map(m => m.message)))

    Users.push(newUser)
    res.send(newUser)

});

router.get('/:id/comments', (req, res) => {
    // check if id is equal to the index number
    const user = Users.filter((user) => user._id === parseInt(req.params.id));
    const comments = Comments.some((comment) => user[0]._id === comment.userId);

    // checks if review is not true return 404 error else return user information
    !comments ?
        res.status(404).send('No comments with the user found') :
        res.send(Comments.filter((comment) => user[0]._id === comment.userId));
});



module.exports = router;