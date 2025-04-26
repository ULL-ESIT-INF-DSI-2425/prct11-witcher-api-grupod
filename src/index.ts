import express from 'express';
import './db/mongoose.js';
import { Note } from './models/note.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/notes', (req, res) => {
  const note = new Note(req.body);

  note.save().then((note) => {
    res.send(note);
  }).catch((error) => {
    res.send(error);
  });
});

app.get('/notes', (req, res) => {
  const filter = req.query.title?{title: req.query.title.toString()}:{};

  Note.find(filter).then((notes) => {
    if (notes.length !== 0) {
      res.send(notes);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});