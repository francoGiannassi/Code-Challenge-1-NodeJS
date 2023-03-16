require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const actorRouter = require('./routes/actor');
const movieRouter = require('./routes/movie');
const episodeRouter = require('./routes/tvShowEpisode');
const userRouter = require('./routes/user');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(actorRouter);
app.use(movieRouter);
app.use(episodeRouter);
app.use(userRouter);

mongoose.connect(process.env.DATABASE_URL).then( (db) => {
    app.listen(3000,'localhost', () => {
    console.log(`Server started on port ${3000}`);
    })
  }
).catch( (err) => {
    console.error(`Error al conectar a la base de datos: ${err}`);
    process.exit();
});