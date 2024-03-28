const ConfigUpload = require('../config/upload');
const { User } = require('../model/model')

const userController = {
    //GET USER PAGE AND LIMIT
    getUserPage: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            console.log(page)
            console.log(limit)
            const skip = (page - 1) * limit;
            const cursors = await User.find().skip(skip).limit(limit);
            res.status(200).json(cursors)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //GET ALL USER
    getAllUser: async (req, res) => {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //GET AN USER
    getAnUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //DELETE USER
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("DELETE SUCCESSFULLY")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //UPDATE USER
    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            await user.updateOne({ '$set': req.body })
            res.status(200).json("UPDATE SUCCESSFULLY")
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = userController;