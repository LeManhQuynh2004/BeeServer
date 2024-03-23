const serviceController = require('../controller/serviceController')

const router = require("express").Router();

//POST SERVICE
router.post('/', serviceController.addService);

//GET SERVICE
router.get('/', serviceController.getAllService);

//GET AN SERVICE
router.get("/:id", serviceController.getAnService)

//UPDATE SERVICE
router.put("/:id", serviceController.updateService);

//DELETE SERVICE
router.delete("/:id", serviceController.deleteData)

module.exports = router; 