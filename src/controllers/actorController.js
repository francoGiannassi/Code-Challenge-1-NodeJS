const { sendRes } = require('../utils/sendRes');
const Actor = require('../models/actor');

// Validate Actor's data
const validateData = (actorData) => {
    let errors = '';
    if(!actorData.name){
        errors += 'Name is undefined, ';
    } else if(!(typeof actorData.name === 'string')){
        errors += 'Name is not a string, ';
    }
    if(!actorData.gender){
        errors += 'Gender is undefined, ';
    } else if(!(typeof actorData.gender === 'string')){
        errors += 'Gender is not a string, ';
    }
    if(!actorData.movies){
        errors += 'Movies is not an array, ';
    } else if(!Array.isArray(actorData.movies)){
        errors += 'Movies is not an array, ';
    }
    if(!actorData.tvShows){
        errors += 'TV Shows is not an array, ';
    } else if(!Array.isArray(actorData.tvShows)){
        errors += 'TV Shows is not an array, ';
    }
    return errors
}

// create an Actor
const create = async (req, res) => {
    try {
        const actorData = req.body.actor;
        if(actorData) {
            let errors = validateData(actorData);
            if (errors != '') { 
                return sendRes(res, 400, errors, 'Body validation errors');
            }
            const actor = await Actor.create(actorData);  
            return sendRes(res, 200, actor, 'Actor created successfully!');
        } 
        return sendRes(res, 400, 'Actor Data is undefined', 'Error');
    } catch (err) {
        return sendRes(res, 500, err, 'Error');
    }
};

module.exports = { create };