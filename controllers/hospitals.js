//@desc Get all hospitals
//@route GET /api/v1/hospitals
//@access Public
exports.getHospitals = (req,res,next)=>{
    res.status(200).json({success:true, msg:"Show all hospitals"});
};

//@desc Get a hospital by id
//@route GET /api/v1/hospitals/:id
//@access Public
exports.getHospital = (req,res,next) => {
    res.status(200).json({succrss:true, msg:`Show hospital ${req.param.id}`});
}

//@desc Create new hospital
//@route POST /api/v1/hospitals
//@access Private
exports.createHospital = (req,res,next) => {
    res.status(200).json({success:true , msg:`Create new hospital`})
}

//@desc Update a hospital by id
//@route PUT /api/v1/hospitals
//@access Private
exports.updateHospital = (req,res,next) => {
    res.status(200).json({success:true , msg:`Update hospital ${req.param.id}`});
}

//@desc Delete a hospital by id
//@route DELETE /api/v1/hospitals
//@access Private
exports.deleteHospital = (req,res,next) => {
    res.status(200).json({success:true , msg:`Delete hospital ${req.param.id}`});
}
