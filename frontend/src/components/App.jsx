import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const res = await axios.get("http://localhost:3000/api/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  }

  async function addNote(newNote) {
    try {
      const res = await axios.post("http://localhost:3000/api/notes", newNote);
      setNotes((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding note", err);
    }
  }

  async function editNote(id, updatedNote) {
    try {
      const res = await axios.put(`http://localhost:3000/api/notes/${id}`, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? res.data : note))
      );
      setEditingNote(null);
    } catch (err) {
      console.error("Error updating note", err);
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Error deleting note", err);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea
        onAdd={addNote}
        onEdit={editNote}
        editingNote={editingNote}
      />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEditClick={() => setEditingNote(noteItem)}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
