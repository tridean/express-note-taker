const express = require('express');
const fs = require('fs');
const uuid = require('uuid'); // If you decide to use uuid for generating unique IDs

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Assuming static files are in a "public" directory

// Routes
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
    s.readFile(__dirname + '/public/notes.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
        });
});

app.get('/api/notes', (req, res) => {
  // Read and return notes from your db.json file
});

app.post('/api/notes', (req, res) => {
  // Receive a new note in the request body, add it to db.json with a unique ID, and return the new note
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
