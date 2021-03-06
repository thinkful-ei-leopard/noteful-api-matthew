require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();

const foldersRouter = require('./folders/folders-router');
const notesRouter = require('./notes/notes-router');

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption, {
  skip: () => NODE_ENV === 'test'
}));
app.use(cors());
app.use(helmet());

app.use('/api/folders', foldersRouter);
app.use('/api/notes', notesRouter);

app.use((error, req, res, next) => {
  let response;
  if(NODE_ENV === 'production') {
    console.error(error);
    response = { error: { message: 'Server Error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;