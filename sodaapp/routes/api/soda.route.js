var express = require('express')
var router = express.Router()
var sodas = require('./api/soda.route')
// Getting the Todo Controller that we just created

var SodaController = require('../../controllers/soda.controller.js');

router.use('/sodas', sodas);

// Map each API to the Controller FUnctions

router.get('/', SodaController.getSodas)

router.post('/', SodaController.createSoda)

router.put('/', SodaController.updateSoda)

router.delete('/:id',SodaController.removeSoda)


// Export the Router

module.exports = router;
