import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const res = await axios.get(API_BASE_URL);
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  }

  async function addNote(newNote) {
    try {
      const res = await axios.post(API_BASE_URL, newNote);
      setNotes((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding note", err);
    }
  }

  async function editNote(id, updatedNote) {
    try {
      const res = await axios.put(`${API_BASE_URL}/${id}`, updatedNote);
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
      await axios.delete(`${API_BASE_URL}/${id}`);
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
