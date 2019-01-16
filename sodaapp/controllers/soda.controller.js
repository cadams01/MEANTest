// We need to be able to access the Service 
//that we just created so let's pull that in

var SodaService = require('../services/soda.service.js');

/*
REMOVED A CHUNK 
// Make sure to save the context of 
//this module inside the _this variable

_this = this
*/

exports.getSodas = async function(req, res, next){

  // We're going to use ternary to check 
  //the existence of the query parameters
      
  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 10; 

  try{

    var sodas = await SodaService.getSodas({}, page, limit)
          
  // Return the todos list with the appropriate 
  //HTTP Status Code and Message.
          
    return res.status(200).json({status: 200, data: sodas, message: "Succesfully Received Sodas"});
        
  }catch(e){
        
  //Return an Error Response Message 
  //with Code and the Error Message.
        
    return res.status(400).json({status: 400, message: e.message});
        
  }
}

exports.createSoda = async function(req, res, next){

  // Note: Req.Body contains the form submit values.

  var soda = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  }

  try{
      
    // Calling the Service function 
    //with the new object from the Request Body

    var createdSoda = await SodaService.createSoda(soda)
    return res.status(201).json({status: 201, data: createdSoda, message: "Succesfully Created Soda"})
  }catch(e){
        
    //Return an Error Response Message 
    //with Code and the Error Message.
      
    return res.status(400).json({status: 400, message: "Soda creation was unsuccesful, I am sorry :( "})
  }
}

exports.updateSoda = async function(req, res, next){

  // Id is necessary for the update

  if(!req.body._id){
    return res.status(400).json({status: 400, message: "Id must be present"})
  }

  var id = req.body._id;

  console.log(req.body)

  var soda = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  }

  try{
    var updatedSoda = await SodaService.updateSoda(soda)
    return res.status(200).json({status: 200, data: updatedSoda, message: "Succesfully Updated Soda"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }
}

exports.removeSoda = async function(req, res, next){

  var id = req.params.id;

  try{
    var deleted = await SodaService.deleteSoda(id)
    return res.status(204).json({status:204, message: "Succesfully Deleted Soda"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }

}