import React, { useState, useEffect, useRef } from "react";
import './NoteApp.css'

function NotesApp() {
  const [notes, setNotes] = useState(() => {
  const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  }); const [newNote, setNewNote] = useState(""); // Tracks the current input value
  const [searchQuery, setSearchQuery] = useState(""); // Tracks the search query
  const [editingIndex, setEditingIndex] = useState(null); // Index of the note being edited
  const inputRef = useRef(null); // Ref for focusing the input field

  // Focus on the input field when the component mounts
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add or update a note
  const addNote = () => {
    if (newNote.trim() === "") return;

    if (editingIndex !== null) {
      // Update an existing note
      setNotes((prevNotes) =>
        prevNotes.map((note, i) => (i === editingIndex ? newNote.trim() : note))
      );
      setEditingIndex(null);
    } else {
      // Add a new note
      setNotes((prevNotes) => [...prevNotes, newNote.trim()]);
    }

    setNewNote(""); // Clear the input field
  };

  // Delete a note
  const deleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

  // Edit a note
  const editNote = (index) => {
    setEditingIndex(index);
    setNewNote(notes[index]);
    inputRef.current.focus(); // Focus on the input field
  };

  // Filter notes based on the search query
  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* App Title */}
      <h1>Note app</h1>

      {/* Input Section */}
      <input ref={inputRef} onChange={(event) => setNewNote(event.target.value)} value={newNote} placeholder={editingIndex === null ? "Enter a new note" : "Edit note"} />
      <button onClick={addNote}>{editingIndex === null ? "Add" : "Update"}</button>

      {/* Search Bar */}
      <input onChange={(event) => setSearchQuery(event.target.value)} />

      {/* Notes List */}
      <ul>
        {filteredNotes.map((note, i) => (<>
          <li style={{ color: editingIndex === i ? "red" : "white" }} key={i}>{note}</li>
          {editingIndex === null ? <> <button onClick={() => editNote(i)}>Edit</button>
            <button onClick={() => deleteNote(i)}>Delete</button></> : null}
        </>)
        )}
      </ul>
      {filteredNotes.length === 0 && <h3>no results</h3>}
    </div>
  );
}

export default NotesApp;