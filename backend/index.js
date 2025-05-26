import express from "express";
import bodyParser from "body-parser";
// import {dirname} from "path";
// import { fileURLToPath } from "url";
import cors from "cors";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = process.env.PORT || 3000;

// const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
env.config();

const db = new pg.Client({
    user : process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect()
  .then(() => console.log("Connected to Postgres"))
  .catch(err => console.error("Postgres connection error", err));

let notes=[];

app.get("/api/notes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM notes ORDER BY id desc");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Example POST endpoint to add a new note
app.post("/api/notes", async (req, res) => {
  console.log("Received body:", req.body);
  const { title, content } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const result = await db.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE note by ID
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM notes WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})