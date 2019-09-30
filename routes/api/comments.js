const express = require('express');
const router = express.Router();
const Comments = require('../../services/Comments')
const alphanumeric = require('alphanumeric-id');
const Joi = require('joi');

// Get all Comments
router.get('/', (req, res) => res.json(Comments))

// Get Single comment
router.get('/:id', (req, res) => {
    // check if id is equal to the index number
    const comment = Comments.some(comment => comment._id === parseInt(req.params.id));

    // checks if user is not true return 404 error else return user information  
    (!comment) ? (res.status(404).send('comment not found')) : (res.send(Comments.filter(comment => comment._id === parseInt(req.params.id))))

})

// create member
router.post('/', (req, res) => {

    // Joi schema to set prerequisites  of content 
    const schema = {
        productId: Joi.number().max(51).required(),
        userId: Joi.number().max(15).required(),
        comment: Joi.string().min(5).required()
    }

    const options = {
        abortEarly: false
    };

    // check validation againt  the schema
    const result = Joi.validate(req.body, schema, options)


    const newComment = {
        _id: Comments.length,
        productId: req.body.productId,
        comment: req.body.comment,
        userId: req.body.userId,
        date: Date(Date.now())
    }

    if (result.error)(res.status(400).send(result.error.details.map(m => m.message)))

    Comments.push(newComment)
    res.send(newComment)

});

router.delete('/:id', (req, res)=>{
    const comment = Comments.find(comment=> comment.id===parseInt(req.params.id));

    if (!comment) res.status(404).send('The comment does not exist in the database');

    const index = Comments.indexOf(comment);
    Comments.splice(index,1)

    res.send(comment)
})

module.exports = router;