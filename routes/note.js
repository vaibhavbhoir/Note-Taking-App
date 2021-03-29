const express = require('express');
const { updateOne } = require('../models/modelNote.js');
const router = express.Router();
const Note = require('../models/modelNote.js');
//Get route
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//Get route
router.get('/:id', getNote, (req, res) => {
    res.json(res.note);
});
//Post Route
router.post('/', async (req, res) => {
    const note = new Note({
        newNote: req.body.newNote,
    });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})
//Delete route
router.delete('/:id', getNote, async (req, res) => {
    try {
        await res.note.remove();
        res.json({ message: 'Deleted Note' });
    } catch (err) {
        res.status(500).json({ message: 'Could not find note' });
    }
});
//Patch route
router.patch('/:id',getNote, async (req, res) => {
    if (req.body.newNote != null) {
        res.note.newNote = req.body.newNote;
    }
    try {
        const updateNote = await res.note.save();
        res.json(updateNote);
    }
    catch (err) {
        res.status(400).json({ message: 'movie not uploaded' });
    }
});
//helper function
async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if (note == null) {
            return res.status(404).json({ message: 'Cannot find Movie' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'The Id selected was not found' });
    }
    res.note = note;
    next();
}
module.exports = router;