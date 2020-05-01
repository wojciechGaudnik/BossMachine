const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRouter = require('./server/api');
const morgan = require('morgan')
const PORT = process.env.PORT || 4001;

const app = express();
module.exports = app;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', apiRouter);

if (!module.parent) { 
    app.listen(PORT, function () {
        console.log(`Server listening on port ${PORT}`);
    })
}
