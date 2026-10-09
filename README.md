# quicknotes-app

title:QuickNotes

QuickNotes is a small, dependency-free note-taking web app for capturing personal, work, and study thoughts in a calm, readable interface. Notes stay in the browser through localStorage, so they remain available after a page reload without requiring an account or backend.

Features
•	Add notes with Personal, Work, or Study categories.
•	Validate empty notes and enforce the 200-character limit.
•	Search notes instantly with case-insensitive text matching.
•	Delete individual notes or clear all notes after confirmation.
•	Persist notes in localStorage between page reloads.
•	Show exact note counts for zero, one, and many notes.
•	Responsive layout that stacks form controls on smaller screens.
•	Safe DOM rendering with createElement and textContent.

Run locally
3	Visit http://localhost:3000 in a browser.

You can also open index.html directly, although using the local server gives the closest experience to the project preview.

What I learned
•	I learned how to build a semantic HTML structure with accessible labels and live status regions.
•	I learned how to keep application state in an array of objects and rebuild the visible list from that state.
•	I learned how to use localStorage with JSON.stringify and JSON.parse to persist browser data.
•	I learned why textContent is safer than injecting user text with innerHTML
