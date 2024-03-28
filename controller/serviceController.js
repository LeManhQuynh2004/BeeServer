const upload = require('../config/upload');
const { Service } = require('../model/model');

const serviceController = {
    getAllService: async (req, res) => {
        try {
            const services = await Service.find();
            res.status(200).json(services)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getPageServer: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;
            const services = await Service.find().skip(skip).limit(limit);
            res.status(200).json(services)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    //GET ALL SERVICE
    getAnService: async (req, res) => {
        try {
            const services = await Service.findById(req.params.id);
            res.status(200).json(services)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE SERVICE
    deleteData: async (req, res) => {
        try {
            await Service.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete SuccessFully")
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //UPDATE SERVICE
    updateService: async (req, res) => {
        try {
            const service = await Service.findById(req.params.id);
            await service.updateOne({ '$set': req.body });
            res.status(200).json("Update SuccessFully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = serviceController;