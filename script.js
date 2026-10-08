const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const clearAllButton = document.querySelector('#clear-all-button');

const STORAGE_KEY = 'quicknotes-notes';
let notes = loadNotes();

function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
    return Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function getCategoryClass(category) {
  return `category-${category.toLowerCase()}`;
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = 'You have ${notes.length} notes.';
  }
}

function createNoteCard(note) {
  const listItem = document.createElement('li');
  listItem.className = `note-card ${getCategoryClass(note.category)}`;

  const noteText = document.createElement('p');
  noteText.className = 'note-text';
  noteText.textContent = note.text;

  const meta = document.createElement('div');
  meta.className = 'note-meta';

  const categoryLabel = document.createElement('span');
  categoryLabel.className = 'category-label';
  categoryLabel.textContent = note.category;

  const date = document.createElement('time');
  date.className = 'note-date';
  date.dateTime = note.createdAt;
  date.textContent = new Date(note.createdAt).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('aria-label', `Delete note: ${note.text.slice(0, 40)}`);
  deleteButton.addEventListener('click', () => deleteNote(note.id));

  meta.append(categoryLabel, date, deleteButton);
  listItem.append(noteText, meta);
  return listItem;
}

function render() {
  while (notesList.firstChild) {
    notesList.removeChild(notesList.firstChild);
  }

  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) => note.text.toLowerCase().includes(searchTerm));

  if (visibleNotes.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.className = 'empty-message';
    emptyMessage.textContent = searchTerm ? 'No notes match your search.' : 'Your notes will appear here.';
    notesList.appendChild(emptyMessage);
  } else {
    visibleNotes.forEach((note) => {
      notesList.appendChild(createNoteCard(note));
    });
  }

  updateCount();
}

function showError(message) {
  errorMessage.textContent = message;
}

function deleteNote(noteId) {
  notes = notes.filter((note) => note.id !== noteId);
  saveNotes();
  render();
}

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (!text) {
    showError('Please type a note first.');
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    showError('Notes must be 200 characters or fewer.');
    noteInput.focus();
    return;
  }

  const note = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    category: noteCategory.value,
    createdAt: new Date().toISOString()
  };

  notes.unshift(note);
  saveNotes();
  noteForm.reset();
  showError('');
  render();
  noteInput.focus();
});

searchInput.addEventListener('input', render);

clearAllButton.addEventListener('click', () => {
  if (notes.length === 0) {
    return;
  }

  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
});

render();