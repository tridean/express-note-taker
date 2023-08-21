// index.js - Frontend JavaScript

// Function to load and display notes from the server
function loadNotes() {
    fetch('/api/notes')
        .then((response) => response.json())
        .then((data) => {
        const notesList = document.querySelector('.list-group');
        notesList.innerHTML = ''; // Clear the existing list

        // Iterate through the notes and create list items
        data.forEach((note) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.dataset.id = note.id;
            listItem.textContent = note.title;
            notesList.appendChild(listItem);
        });
        })
        .catch((error) => {
        console.error('Error loading notes:', error);
        });
    }

  // Function to save a new note
    function saveNote() {
    const noteTitle = document.querySelector('.note-title').value;
    const noteText = document.querySelector('.note-textarea').value;

    fetch('/api/notes', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: noteTitle, text: noteText }),
    })
        .then((response) => response.json())
        .then(() => {
        loadNotes(); // Reload the notes after saving a new one
        })
        .catch((error) => {
        console.error('Error saving note:', error);
        });
    }

  // Function to handle click events on note items
    function handleNoteClick(event) {
    if (event.target.matches('.list-group-item')) {
        const noteId = event.target.dataset.id;

      // You can implement logic to retrieve and display the clicked note
      // based on its ID, either in a modal or on the right-hand side of the page.
      // You'll need to make another API request to get the note details.
      // Example: fetch(`/api/notes/${noteId}`)
    }
    }

  // Event listeners
    document.querySelector('.save-note').addEventListener('click', saveNote);
    document.querySelector('.list-container').addEventListener('click', handleNoteClick);

  // Initial load of notes when the page loads
    loadNotes();
