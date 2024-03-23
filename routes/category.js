const categoryController = require("../controller/categoryController");

const router = require("express").Router();

//GET ALL
router.get('/', categoryController.getAllCategory)
//GET AN
router.get('/:id', categoryController.getAnCategory)
//POST
router.post('/', categoryController.postCategory)
//DELETE
router.delete('/:id', categoryController.deleteCategory)
//UPDATE
router.put('/:id', categoryController.updateCategory)

module.exports = router;