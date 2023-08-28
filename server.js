const express = require('express');
const fs = require('fs');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Read data from JSON file
function readDataFromFile() {
    try {
    const data = fs.readFileSync('db.json', 'utf8');
    return JSON.parse(data);
    } catch (error) {
    console.error('Error reading data from file:', error);
    return [];
    }
}

// Write data to JSON file
function writeDataToFile(data) {
    try {
    fs.writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
    console.error('Error writing data to file:', error);
    }
}

// Initial data (empty array)
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
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
    };

  // Read existing data from the file
    notes = readDataFromFile();

  // Add the new note to the data array
    notes.push(newNote);

  // Write the updated data back to the file
    writeDataToFile(notes);

  // Send the new note as a response
    res.json(newNote);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});