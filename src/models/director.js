const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const directorSchema = new Schema({
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
    tvShowEpisodes: [{
        type: ObjectId,
        ref: 'TVShowEpisode',
    }],
});

module.exports = mongoose.model('Director', directorSchema);