const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');

require('custom-env').env();

if (process.env.NODE_ENV === 'dev') {
	dotenv.config({ path: '.env.dev' });
} else if (process.env.NODE_ENV === 'prod') {
	dotenv.config({ path: '.env.prod' });
} else if (process.env.NODE_ENV === 'test') {
	dotenv.config({ path: '.env.test' });
}

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'dev') {
	app.use(morgan('dev'));
}

const uriConnStr = process.env.ATLAS_URI;

console.log(uriConnStr);

mongoose.connect(uriConnStr, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

//use gmail email id for mongo db
connection.once('open', () => {
	if (process.env.NODE_ENV === 'dev') {
		console.log("MongoDB database connection established successfully");
	}
})

const optionRouter = require('./routes/option');

app.use('/', optionRouter);

const server = app.listen(port, () => {
	if (process.env.NODE_ENV === 'dev') {
		console.log(`Server is running on port: ${port}`);
	}
});

module.exports = server;