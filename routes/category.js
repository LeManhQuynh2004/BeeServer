const categoryController = require("../controller/categoryController");

const router = require("express").Router();

//GET ALL
router.get('/', categoryController.getAllCategory)
//POST
router.post('/data', categoryController.postCategory)
//GET AN
router.get('/:id', categoryController.getAnCategory)
//DELETE
router.delete('/:id', categoryController.deleteCategory)
//UPDATE
router.put('/:id', categoryController.updateCategory)

module.exports = router;