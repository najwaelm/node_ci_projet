const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title : {type: String, required: true},
    images : [String], //le chemin de notre image
}, 
{ timestamps: true});

module.exports = mongoose.model('Album', albumSchema);