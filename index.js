const express = require('express');
// const validate = require('./validate.js');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/note';
const noteRouter = require('./routes/note.js');

app.use(express.static('public'));
mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected To Database'));

app.use(express.json());
app.use('/note', noteRouter);
// const notes = [
//     { id: 1, note: 'note1' },
//     { id: 2, note: 'note2' },
//     { id: 3, note: 'note3' }
// ];

// app.get('/', (req, res) => {
//     res.send('Hello js');
// });

// //GET ROUTE
// app.get('/note', (req, res) => {
//     res.send(notes);
// });

// //GET ROUTE
// app.get('/note/:id', (req, res) => {
//     const note = notes.find(function (n) {
//         return n.id === parseInt(req.params.id);
//     });
//     if (!note)
//         res.status(404).send('This note is not available');
//     res.send(note);
// });

// //POST Route
// app.post('/note', (req, res) => {
//     validate(req,res);
//     const note = {
//         id: notes.length + 1,
//         note: req.body.note
//     }
//     notes.push(note);
//     res.send(note);
// });

// //PUT Route
// app.put('/note/:id', (req, res) => {
//     const note = notes.find(function (n) {
//         return n.id === parseInt(req.params.id);
//     });
//     if (!note)
//         res.status(404).send('This note is not available');
//     validate(req,res);
//     notes.note = req.body.note;
//     res.send(note);
// });

// //DELETE Route
// app.delete('/note/:id', (req, res) => {
//     const note = notes.find(function (n) {
//         return n.id === parseInt(req.params.id);
//     });
//     if (!note)
//         res.status(404).send('This note is not available');
//     let index = notes.indexOf(note);
//     notes.splice(index,1);
//     res.send(note);

// });

app.listen(PORT, function () {
    console.log(`Listening on port: ${PORT}`);
})