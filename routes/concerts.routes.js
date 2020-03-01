const express = require('express');
const router = express.Router();
const Concert = require('../models/concert.model');

router.get('/concerts', async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/concerts/random', async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const con = await Concert.findOne().skip(rand);
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  } catch (err) {
    res.json(err);
  }
});

router.get('/concerts/:id', async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/concerts', async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/concerts/:id', async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.updateOne(
        { _id: req.params.id },
        { $set: { performer: performer, genre: genre, price: price, day: day, image: image } }
      );
      const conUpdated = await Concert.findById(req.params.id);
      res.json(conUpdated);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/concerts/:id', async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(con);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
