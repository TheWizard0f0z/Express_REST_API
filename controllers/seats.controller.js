const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const sea = await Seat.findOne().skip(rand);
    if (!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.getOneById = async (req, res) => {
  try {
    const sea = await Seat.findById(req.params.id);
    if (!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.postOne = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const unavailable = await Seat.findOne({ $and: [{ day: day }, { seat: seat }] });
    if (unavailable) {
      res.status(405).json({ message: 'The slot is already taken...' });
    } else {
      const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
      await newSeat.save();
      req.io.emit('seatsUpdated', await Seat.find());
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.updateOneById = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const sea = await Seat.findById(req.params.id);
    if (sea) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email } });
      const seaUpdated = await Seat.findById(req.params.id);
      res.json(seaUpdated);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.deleteOneById = async (req, res) => {
  try {
    const sea = await Seat.findById(req.params.id);
    if (sea) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(sea);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
