// handlebars
const exhdlbrs = require('express-handlebars');




module.exports = exhdlbrs.create({
    defaultLayout: 'main',

    // create custom helpers
    helpers: {
        concat: (x, y) => `${x} ${y}`

    }
});