const express = require("express");
const {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
  getVacCenters
} = require("../controllers/hospitals");
const { protect, authorize } = require("../middleware/auth");

const appointmentRouter = require('./appointments')

router = express.Router();

// router.get('/', getHospitals);

// router.get('/:id',getHospital);

// router.post('/' , createHospital) 

// router.put('/:id',updateHospital)

// router.delete('/:id', deleteHospital);

router.use('/:hospitalId/appointments/',appointmentRouter)

router
  .route("/")
  .get(getHospitals)
  .post(protect, authorize("admin"), createHospital);
router.route("/vacCenters").get(getVacCenters);
router
  .route("/:id")
  .get(getHospital)
  .delete(protect, authorize("admin"), deleteHospital)
  .put(protect, authorize("admin"), updateHospital);



module.exports = router;
