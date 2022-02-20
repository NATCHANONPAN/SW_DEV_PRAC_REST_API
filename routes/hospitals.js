const express = require("express");
const {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals");
const { protect, authorize } = require("../middleware/auth");

router = express.Router();

// router.get('/', getHospitals);

// router.get('/:id',getHospital);

// router.post('/' , createHospital)

// router.put('/:id',updateHospital)

// router.delete('/:id', deleteHospital);

router
  .route("/")
  .get(getHospitals)
  .post(protect, authorize("admin"), createHospital);
router
  .route("/:id")
  .get(getHospital)
  .delete(protect, authorize("admin"), deleteHospital)
  .put(protect, authorize("admin"), updateHospital);

module.exports = router;
