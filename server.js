const express = require('express');
const fs = require('fs');
const uuid = require('uuid'); // Import the 'uuid' package
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Assuming static files are in a "public" directory

// Array to store notes (replace this with a database in a production app)
let notes = [];

// HTML Routes
app.get('/', (req, res) => {
    fs.readFile(__dirname + '/public/index.html', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } else {
        res.send(data);
    }
    });
});

app.get('/notes', (req, res) => {
    fs.readFile(__dirname + '/public/notes.html', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } else {
        res.send(data);
    }
    });
});

// API Routes
app.get('/api/notes', (req, res) => {
  res.json(notes); // Return the array of notes as JSON
});

app.post('/api/notes', (req, res) => {
  // Create a new note object with a unique ID using 'uuid'
    const newNote = {
    id: uuid.v4(), // Generate a unique ID using 'uuid'
    title: req.body.title,
    text: req.body.text,
    };

  // Add the new note to the array of notes
    notes.push(newNote);

  // Send the new note as a response
    res.json(newNote);
});

// Route to view a specific note by ID
app.get('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

  // Find the note with the matching ID
    const selectedNote = notes.find((note) => note.id === noteId);

    if (!selectedNote) {
    // Handle the case where the note with the given ID does not exist
    return res.status(404).json({ error: 'Note not found' });
    }

  // Send the selected note as JSON response
    res.json(selectedNote);
});

// Route to edit a specific note by ID
app.put('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const updatedNote = req.body;

  // Find the index of the note with the matching ID
    const index = notes.findIndex((note) => note.id === noteId);

    if (index === -1) {
    // Handle the case where the note with the given ID does not exist
    return res.status(404).json({ error: 'Note not found' });
    } 

  // Update the note in your data storage 
    notes[index] = updatedNote;

  // Send the updated note as JSON response
    res.json(updatedNote);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
