import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom, Button } from "@mui/material";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const { editingNote, onEdit } = props;

  useEffect(() => {
    if (editingNote) {
      setNote({
        title: editingNote.title || "",
        content: editingNote.content || "",
      });
      setExpanded(true);
    }
  }, [editingNote]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function submitNote(event) {
    event.preventDefault();
    if (editingNote) {
      onEdit(editingNote.id, note);
    } else {
      props.onAdd(note);
    }
    setNote({ title: "", content: "" });
    setExpanded(false);
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoComplete="off"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {/* Always show Add/Update button */}
          <Zoom in={isExpanded}>
            <Fab
              type="submit"
              aria-label={editingNote ? "Update note" : "Add note"}
              size="medium"
            >
              <AddIcon />
            </Fab>
          </Zoom>
        </div>

      </form>
    </div>
  );
}

export default CreateArea;
