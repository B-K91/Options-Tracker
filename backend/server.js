const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('custom-env').env();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uriConnStr = process.env.ATLAS_URI;

mongoose.connect(uriConnStr, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;

//use gmail email id for mongo db
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const optionRouter = require('./routes/option');

app.use('/option', optionRouter);

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = server;