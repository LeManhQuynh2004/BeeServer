const {Dress} = require('../model/model')

const weddingDressController = {
    //POST DRESS
    addDress : async (req,res) => {
        try {
            const newDress = new Dress(req.body)
            await newDress.save();
            res.status(200).json("Add SuccessFully")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //GET ALL
    getAllDress : async (req,res) => {
        try {
            const users = await Dress.find()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //GET AN DRESS
    getAnDress : async (req,res) => {
        try {
            const dress = await Dress.findById(req.params.id);
            res.status(200).json(dress)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //DELETE
    deleteDress : async (req,res) => {
        try {
            await Dress.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete SuccessFully")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //UPDATE
    updateDress : async (req,res) => {
        try {
            const dress = await Dress.findById(req.params.id);
            await dress.updateOne({ '$set': req.body })
            res.status(200).json("UPDATE SUCCESSFULLY")
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = weddingDressController;