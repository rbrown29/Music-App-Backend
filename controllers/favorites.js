const express = require('express');

const router = express.Router();

const Favorite = require('../models/favorites.js');

router.get('/', async (req, res) => {

    try {
        const favorites = await Favorite.find({});
        res.json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log("Request body:", req.body); // Log the request body
        const createdFavorite = await Favorite.create(req.body);
        res.json(createdFavorite);
    } catch (error) {
        console.error("Error creating favorite:", error); // Log the error
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedFavorite = await Favorite.findByIdAndRemove(req.params.id);
        res.json(deletedFavorite);
    } catch (error) {
        console.error("Error deleting favorite:", error); // Log the error
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;