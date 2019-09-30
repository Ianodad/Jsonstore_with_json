const express = require('express')
// middleware that logs request
const morgan = require('morgan')
// assign express to app
const app = express();
const winston = require('winston');


const Cors = require('cors');



app.use(Cors());


require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/config')();
require('./startup/prod')(app);



// creating a port
const PORT = process.env.PORT || 5000;

// env define log
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Application environment: ${app.get('env')}`);
app.listen(PORT, () => winston.info(`Server started on port ${PORT}`));