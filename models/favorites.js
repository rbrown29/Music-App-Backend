const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: true},
    coverArt: {type: String, required: true}
});

const Favorite = mongoose.model('Favorite', favoritesSchema);

module.exports = Favorite;