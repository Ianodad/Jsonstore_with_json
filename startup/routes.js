const error = require('../middleware/error')
const express = require('express');
// get helper functions
const hbs = require('../helpers')

module.exports = function (app) {
    // app.use(morgan('tiny'));

    app.use(express.urlencoded({
        extended: false
    }));

    app.use(express.static('public'));
    //  HANDLEBARS ENGINE  
    // setting template engine to handlebars
    app.engine('handlebars', hbs.engine);
    // setting up view engine
    app.set('view engine', 'handlebars');
    //  END- HANDLEBARS    //

    // Body Parser
    app.use(express.json());

   // API ROUTING  /////

   // route for the users
   app.use('/api/users', require('../routes/api/users'));
   app.use('/api/comments', require('../routes/api/comments'));
   app.use('/api/products', require('../routes/api/products'));
   app.use('/api/company', require('../routes/api/company'));
   app.use('/api/category', require('../routes/api/category'));


    /////    API ROUTING -END   /////

    // ROUTING PAGES ///
    app.use('/', require('../routes/home'))
    app.use('/store', require('../routes/store'))
    app.use('/about', require('../routes/about'))
    //  END ROUTING ////
    app.use(error);

}