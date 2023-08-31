const express = require('express');

const {
    getbootcamp,
    bootcamp,
    storebootcamp,
    updatebootcamp,
    deletebootcamp
} = require('../controllers/bootcamps')

const router = express.Router();

router.route('/').get(getbootcamp).post(storebootcamp);

router.route('/:id').get(bootcamp).put(updatebootcamp).delete(deletebootcamp);

module.exports = router;