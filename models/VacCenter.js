const sql = require('../config/vacCenterDB')

const VacCenter = function(vacCenter){
    this.id = vacCenter.id;
    this.name = vacCenter.name;
    this.tel = vacCenter.tel;
}

VacCenter.getAll = result => {
    console.log('here')
    sql.query("SELECT * FROM vacCenters" ,(err,res) => {
        if(err){
            console.log('error: ',err)
            result(null,err)
            return ;
        }
        console.log("vacCenters: ",res);
        result(null,res);
        
    })
}

module.exports = VacCenter;