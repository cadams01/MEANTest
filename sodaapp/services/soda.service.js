// Access our newly created Mongoose Model
var Soda = require('../models/soda.model.js')

/*
REMOVED A CHUNK 
// Saving the context of this module inside the _this variable
_this = this
*/

// Let's use an Async function to get the To Do List
exports.getSodas = async function(query, page, limit){

  // We also want to set up options for the mongoose paginate

  var options = {
      page,
      limit
  }
  //Let's create a Try and Catch function 
  //that way we have some error handling set. 
  //Waiting for the promise
      
  try {
    var sodas = await Soda.paginate(query, options)
    
  //Once the Mongoose promise is returned 
  //we're going to go ahead and return 
  //the To Do List it has produced 

    return sodas;

  } catch (e) {

  //If the try didn't work we're going to 
  //go ahead and let the users know what kind of 
  //Error we have

    throw Error('Oh No! We got an error while Paginating our Sodas, so sorry!' )
  }
}

exports.createSoda = async function(soda){
  
// Creating a new Mongoose Object by using the new keyword

  var newSoda = new Soda({
    title: soda.title,
    description: soda.description,
    date: new Date(),
    status: soda.status
  })

  try{

    // Let's go ahead and save the Todo 

    var savedSoda = await newSoda.save()

    return savedSoda;
  }catch(e){
  
    //if we can't create a Todo we want to throw an error 

    throw Error("Error while Creating Soda")
  }
}

exports.updateSoda = async function(soda){
  var id = soda.id

  try{
    //Find the old Todo Object by the Id

    var oldSoda = await Soda.findById(id);
  }catch(e){
    throw Error("Error occured while Finding Soda")
  }

  // If no old Todo Object exists return false

  if(!oldSoda){
    return false;
  }

  console.log(oldSoda)

  //Edit the Todo Object

  oldSoda.title = soda.title
  oldSoda.description = soda.description
  oldSoda.status = soda.status


  console.log(oldSoda)

  try{
    var savedSoda = await oldSoda.save()
    return savedSoda;
  }catch(e){
    throw Error("And Error occured while updating Soda");
  }
}
exports.deleteSoda = async function(id){
    
  // Delete the Todo

  try{
    var deleted = await Soda.deleteOne({_id: id})
    if(deleted.n === 0){
      throw Error("Soda Could not be deleted")
    }
    return deleted
  }catch(e){
    throw Error("Error Occured while Deleting Soda")
  }
}