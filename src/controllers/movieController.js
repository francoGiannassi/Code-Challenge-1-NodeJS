const { sendRes } = require('../utils/sendRes');
const Movie = require('../models/movie');

// Get Movies by genre, director ID and/or title
const getBy = async (req, res) =>{
    try {
        const filters = req.body.filters;
        const sortType = req.body.sort && req.body.sort.type ? req.body.sort.type : '';
        const sortField = req.body.sort && req.body.sort.field ? req.body.sort.field : '';
        const query = {};
        let sortBy = {};
        if(filters){
            if(filters.genre){
                query.genre = filters.genre;
            }
            if(filters.directorID){
                query.director = filters.directorID;
            }
            if(filters.title){
                query.title = filters.title;
            }
        }
        if(sortField && sortType){
            sortBy = { sortField: sortType };
        }
        const movies = await Movie.find(query).sort(sortBy);
        return sendRes(res, 200, movies);
    } catch (err) {
        console.log(err);
        return sendRes(res, 500, err, 'Error');
    }
};

module.exports = { getBy };