const { restart } = require('nodemon');
const Hospital = require('../models/Hospital');
const vacCenter = require('../models/VacCenter');

require('../models/Hospital');


//@desc Get all hospitals
//@route GET /api/v1/hospitals
//@access Public
exports.getHospitals = async (req,res,next)=>{
    let query;

    //copy req.query
    const reqQuery = {...req.query}

    //field to exclude
    const removefields = ['select','sort','page','limit']

    removefields.forEach(param => delete reqQuery[param])
    console.log(reqQuery)

    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    query = Hospital.find(JSON.parse(queryStr)).populate('appointments');

    if(req.query.select){
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }
    else{
        query = query.sort('-createdAt')
    }

    const page = parseInt(req.query.page,10) || 1
    const limit = parseInt(req.query.limit,10) || 25
    const startIndex = (page-1)*limit
    const endIndex = page*limit
    const total = await Hospital.countDocuments()

    query = query.skip(startIndex).limit(limit)

    


    try{
        const hospitals = await query;

        //pagination reault 
        const pagination = {}

        if(endIndex < total){
            pagination.next = {
                page:page+1,
                limit
            }
        }
        
        if(startIndex>0){
            pagination.prev={
                page:page-1,
                limit
            }
        }
        res.status(200).json({success:true, count:hospitals.length,data:hospitals});
    } catch(err){
        res.status(400).json({success:false});
    }
    
};

//@desc Get a hospital by id
//@route GET /api/v1/hospitals/:id
//@access Public
exports.getHospital = async (req,res,next) => {
    try{
        const hospital = await Hospital.findById(req.params.id);

        if(!hospital){
            return res.status(400).json({success:false});
        }
        res.status(200).json({succrss:true, data:hospital});
    }catch(err){
        res.status(400).json({success:false});
    }
    
}

//@desc Create new hospital
//@route POST /api/v1/hospitals
//@access Private
exports.createHospital = async (req,res,next) => {
    console.log(req.body);
    const hospital = await Hospital.create(req.body);
    res.status(201).json({success:true , data:hospital})
}

//@desc Update a hospital by id
//@route PUT /api/v1/hospitals
//@access Private
exports.updateHospital = async (req,res,next) => {
    try{
        const hospital = await Hospital.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true
        });


        if(!hospital){
            res.status(400).json({success:false});
        }

        res.status(200).json({success:true , data:hospital});
    }catch(err){
        res.status(400).json({success:false});
    }
   
}

//@desc Delete a hospital by id
//@route DELETE /api/v1/hospitals
//@access Private
exports.deleteHospital = async (req,res,next) => {
    try{
        const hospital = await Hospital.findById(req.params.id);

        if(!hospital){
            return res.status(400).json({success:false})
        }
        
        hospital.remove()
        res.status(200).json({sucess:true,data:{}});
    }catch(err){
        res.status(400).json({success:false});
    }
}

exports.getVacCenters = (req,res,next) => {
    vacCenter.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Vaccine Centers"
            })
        }
        else{
            res.send(data)
        }
    })
}