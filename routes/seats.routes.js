const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/random', SeatController.getRandom);
router.get('/seats/:id', SeatController.getOneById);
router.post('/seats', SeatController.postOne);
router.put('/seats/:id', SeatController.updateOneById);
router.delete('/seat/:id', SeatController.deleteOneById);

module.exports = router;
