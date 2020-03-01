const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials/:id', TestimonialController.getOneById);
router.post('/testimonials', TestimonialController.postOne);
router.put('/testimonials/:id', TestimonialController.updateOneById);
router.delete('/concert/:id', TestimonialController.deleteOneById);

module.exports = router;
