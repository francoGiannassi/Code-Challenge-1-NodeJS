const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const tvShowSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
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
    seasons: [{
        seasonNumber: {
        type: Number,
        required: true,
        },
        episodes: [{
            type: ObjectId,
            ref: 'TVShowEpisode',
        }],
    }],
});

module.exports = mongoose.model('TVShow', tvShowSchema);