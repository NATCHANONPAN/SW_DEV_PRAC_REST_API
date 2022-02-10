const express = require('express');
const { getHospitals, getHospital, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');

router = express.Router();

// router.get('/', getHospitals);

// router.get('/:id',getHospital);

// router.post('/' , createHospital)

// router.put('/:id',updateHospital)

// router.delete('/:id', deleteHospital);

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').get(getHospital).delete(deleteHospital).put(updateHospital);

module.exports = router