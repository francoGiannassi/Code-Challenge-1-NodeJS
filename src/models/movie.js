const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
    },
    actors: [{
        type: ObjectId,
        ref: 'Actor',
    }],
    director: {
        type: ObjectId,
        ref: 'Director',
        required: true,
    },
});

module.exports = mongoose.model('Movie', movieSchema);