const express = require('express');

const router = express.Router();

const Song = require('../models/songs.js');

router.get('/', async (req, res) => {
    try {
        const songs = await Song.find({});
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.post('/', async (req, res) => {
    try {
        console.log("Request body:", req.body); // Log the request body
        const createdSong = await Song.create(req.body);
        res.json(createdSong);
    } catch (error) {
        console.error("Error creating song:", error); // Log the error
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedSong = await Song.findByIdAndRemove(req.params.id);
        res.json(deletedSong);
    } catch (error) {
        console.error("Error deleting song:", error); // Log the error
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;