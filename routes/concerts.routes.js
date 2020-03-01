const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getOneById);
router.post('/concerts', ConcertController.postOne);
router.put('/concerts/:id', ConcertController.updateOneById);
router.delete('/concerts/:id', ConcertController.deleteOneById);

module.exports = router;
