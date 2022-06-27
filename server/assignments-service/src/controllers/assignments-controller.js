var mongoose = require('mongoose');
var AssignmentsSchema = require('./../models/assignments');
const controller = {};

controller.add = async (req, res) => {
  const data = req.body;
  console.log("Data",data)
  console.log("Req",req.body )

  const post = new AssignmentsSchema({
		idEmployee: req.body.idEmployee,
    idEmployeeAssign:req.body.idEmployeeAssign,
    name: req.body.name,
    profesion: req.body.profesion,
    assignName: req.body.assignName,
    assignProfesion:req.body.assignProfesion,
	})

	await post.save()

  res.json({"mensage":"OK","status":true});
}

controller.update = async (req, res) => {
  const data = req.body;
  console.log("Data",data.idEmployee)
  console.log("Req",req.body )

  const update = new AssignmentsSchema({
		idEmployee: req.body.idEmployee,
		list: req.body.list,
	})

  const dataResp = await AssignmentsSchema.updateOne({idEmployee:req.body.idEmployee},{list:req.body.list} ).then(data=>{
    res.json({"resp":data,"status":true});
  }).catch(error=>{



  })


}

controller.getById = async (req, res) => {
  
  const { id } = req.params;
  
  console.log("Data",id)
  
  const dataResp = await AssignmentsSchema.find({idEmployee:id}).then(data=>{
    if(data == null){
      res.json({"resp":null,"status":false});
    }else{
      res.json({"resp":data,"status":true});
    }
   
  })
  
}

controller.getByIdAssign = async (req, res) => {
  
  const { id } = req.params;
  
  console.log("Data",id)
  
  await AssignmentsSchema.find({idEmployeeAssign:id}).then(data=>{
    if(data == null){
      res.json({"resp":null,"status":false});
    }else{
      console.log(data)
      res.json({"resp":data,"status":true});
    }
   
  })
  
}

module.exports = controller;