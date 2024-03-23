const ContractController = require('../controller/contractController');

const router = require('express').Router();

router.get('./data',ContractController.getAllContract)

router.get('./data/:id',ContractController.getAnContract)


module.exports = router