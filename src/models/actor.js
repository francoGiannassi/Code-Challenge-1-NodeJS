const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const actorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    movies: [{
        type: ObjectId,
        ref: 'Movie',
    }],
    tvShows: [{
        type: ObjectId,
        ref: 'TVShow',
    }],
});

module.exports = mongoose.model('Actor', actorSchema);