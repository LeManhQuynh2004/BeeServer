const {Category} = require('../model/model')

const categoryController = {
    //GET ALL CATEGORY
    getAllCategory : async (req,res) => {
        try {
            const category = Category.find()
            res.status(200).json(category)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //POST CATEGORY
    postCategory : async (req,res) => {
        try {
            const newCategory = new Category(req.body)
            await newCategory.save();
            res.status(200).json("ADD SUCCESSFULLY")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //GET AN CATEGORY
    getAnCategory : async (req,res) => {
        try {
            const category = await Category.findById(req.params.id);
            res.status(200).json(category)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //DELETE CATEGORY
    deleteCategory : async (req,res) => {
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json("DELETE SUCCESSFULLY")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //UPDATE CATEGORY
    updateCategory : async (req,res) => {
        try {
            const category = await Category.findById(req.params.id);
            await category.UpdateOne({$set : req.body})
            res.status(200).json("UPDATE SUCCESSFULLY")
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = categoryController;