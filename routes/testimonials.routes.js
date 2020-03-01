const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonial.model');

router.get('/testimonials', async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/testimonials/random', async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  } catch (err) {
    res.json(err);
  }
});

router.get('/testimonials/:id', async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/testimonials', async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/testimonials/:id', async (req, res) => {
  const { author, text } = req.body;
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (tes) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text } });
      const tesUpdated = await Testimonial.findById(req.params.id);
      res.json(tesUpdated);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json(tes);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
