const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types

const episodeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tvShow: {
        type: ObjectId,
        ref: 'TVShow',
    },
    seasonNumber: {
        type: Number,
        required: true,
    },
    episodeNumber: {
        type: Number,
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
    },
    director: {
        type: ObjectId,
        ref: 'Director',
    },
});

module.exports = mongoose.model('TVShowEpisode', episodeSchema);