const { sendRes } = require('../utils/sendRes')
const TVShowEpisode = require('../models/tvShowEpisode');

//  
// Note: I did both Endpoints to make sure that the one you wanted is there
//

// Get Episode by ID
const getOneByID = async (req, res) => {
    try {
        const episodeID = req.params.id;
        if(episodeID){
            const episode = await TVShowEpisode.findById(episodeID).populate('Director');
            return sendRes(res, 200, episode);
        }
        return sendRes(res, 400, 'No episode ID was given', 'Error');
    } catch (err) {
        return sendRes(res, 500, err, 'Error');
    }
};

// Get Episode by Tv Show ID, episode Season and episode number
const getOneBy = async (req, res) => {
    try {
        const episodeTvShowID = req.body.tvShowID;
        const episodeSeason = req.body.season;
        const episodeNumber = req.body.number;
        if(episodeTvShowID && episodeSeason && episodeNumber){
            const episode = await TVShowEpisode.find({
                tvShow: episodeTvShowID, 
                seasonNumber: episodeSeason, 
                episodeNumber: episodeNumber})
                .populate('Director');
            return sendRes(res, 200, episode);
        }
        return sendRes(res, 400, 'No TV Show ID, episode season and/or number was given', 'Error');
    } catch (err) {
        return sendRes(res, 500, err, 'Error');
    }
};

module.exports = { getOneByID, getOneBy};