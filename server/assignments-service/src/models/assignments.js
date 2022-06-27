const mongoose   = require('mongoose')


const AssignmentsSchema =  mongoose.Schema ({
    idEmployee : {type:String, require :true},
    idEmployeeAssign  : {type:String, require :true},
    name : {type:String, require :true},
    profesion  : {type:String, require :true},
    assignName : {type:String, require :true},
    assignProfesion  : {type:String, require :true},
})


module.exports = mongoose.model("assignments", AssignmentsSchema)