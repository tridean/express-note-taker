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

      // Fetch the details of the clicked note
        fetch(`/api/notes/${noteId}`)
        .then((response) => response.json())
        .then((note) => {
          // Populate the UI elements with the note details for editing
            document.querySelector('.note-title').value = note.title;
            document.querySelector('.note-textarea').value = note.text;

          // Store the ID of the note being edited for later
            document.querySelector('.note-textarea').dataset.id = noteId;
        })
        .catch((error) => {
            console.error('Error loading note details:', error);
        });
    }
}

  // Function to save an edited note
    function saveEditedNote() {
    const noteId = document.querySelector('.note-textarea').dataset.id; // Get the ID of the note being edited
    const noteTitle = document.querySelector('.note-title').value;
    const noteText = document.querySelector('.note-textarea').value;

    // Send a PUT request to update the note on the server
    fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: noteTitle, text: noteText }),
    })
        .then((response) => response.json())
        .then(() => {
        // Reload the notes after saving an edited note
        loadNotes();
        })
        .catch((error) => {
        console.error('Error saving edited note:', error);
        });
    }

  // Event listeners
    document.querySelector('.save-note').addEventListener('click', saveNote);
    document.querySelector('.list-container').addEventListener('click', handleNoteClick);
    document.querySelector('.save-edited-note').addEventListener('click', saveEditedNote);

  // Initial load of notes when the page loads
    loadNotes();
