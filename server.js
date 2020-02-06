const express = require('express');
const path = require('path');
const cors = require('cors');
const uuidv4 = require('uuid/v4');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//TESTIMONIALS

//returns the entire contents of the array
app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

//returns a random element from an array
app.get('/testimonials/random', (req, res) => {
  const randomRecord =
    db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(randomRecord);
});

//returns only one element of the array, matching: id
app.get('/testimonials/:id', (req, res) => {
  const id = req.params.id;

  for (let record of db.testimonials) {
    if (record.id == id) {
      res.json(record);
    }
  }
});

//add a new element to the array
app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  const newRecord = { id: uuidv4(), author: author, text: text };
  db.testimonials.push(newRecord);

  res.json({ message: 'OK' });
});

//edit array element
app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;

  for (let record of db.testimonials) {
    if (record.id == id) {
      record.author = author;
      record.text = text;
    }
  }

  res.json({ message: 'OK' });
});

//removes an element from the array, matching: id
app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;

  for (let record of db.testimonials) {
    if (record.id == id) {
      db.testimonials.splice(db.testimonials.indexOf(record));
    }
  }

  res.json({ message: 'OK' });
});

//CONCERTS

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

//returns a random element from an array
app.get('/concerts/random', (req, res) => {
  const randomRecord =
    db.concerts[Math.floor(Math.random() * db.concerts.length)];
  res.json(randomRecord);
});

//returns only one element of the array, matching: id
app.get('/concerts/:id', (req, res) => {
  const id = req.params.id;

  for (let record of db.concerts) {
    if (record.id == id) {
      res.json(record);
    }
  }
});

//add a new element to the array
app.post('/concerts', (req, res) => {
  const { author, text } = req.body;

  const newRecord = { id: uuidv4(), author: author, text: text };
  db.concerts.push(newRecord);

  res.json({ message: 'OK' });
});

//edit array element
app.put('/concerts/:id', (req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;

  for (let record of db.concerts) {
    if (record.id == id) {
      record.author = author;
      record.text = text;
    }
  }

  res.json({ message: 'OK' });
});

//removes an element from the array, matching: id
app.delete('/concerts/:id', (req, res) => {
  const id = req.params.id;

  for (let record of db.concerts) {
    if (record.id == id) {
      db.concerts.splice(db.concerts.indexOf(record));
    }
  }

  res.json({ message: 'OK' });
});

//SEATS

app.get('/seats', (req, res) => {
  res.json(db.seats);
});

//returns a random element from an array
app.get('/seats/random', (req, res) => {
  const randomRecord = db.seats[Math.floor(Math.random() * db.seats.length)];
  res.json(randomRecord);
});

//returns only one element of the array, matching: id
app.get('/seats/:id', (req, res) => {
  const id = req.params.id;

  for (let record of db.seats) {
    if (record.id == id) {
      res.json(record);
    }
  }
});

//add a new element to the array
app.post('/seats', (req, res) => {
  const { author, text } = req.body;

  const newRecord = { id: uuidv4(), author: author, text: text };
  db.seats.push(newRecord);

  res.json({ message: 'OK' });
});

//edit array element
app.put('/seats/:id', (req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;

  for (let record of db.seats) {
    if (record.id == id) {
      record.author = author;
      record.text = text;
    }
  }

  res.json({ message: 'OK' });
});

//removes an element from the array, matching: id
app.delete('/seats/:id', (req, res) => {
  const id = req.params.id;

  for (let record of db.seats) {
    if (record.id == id) {
      db.seats.splice(db.seats.indexOf(record));
    }
  }

  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
