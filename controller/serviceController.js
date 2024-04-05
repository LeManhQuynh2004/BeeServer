const { Service } = require("../model/model");

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
            const serviceUpdate = await service.updateOne({ '$set': req.body });
            res.status(200).json(serviceUpdate);
            console.log(serviceUpdate)
        } catch (err) {
            console.error('Error updating service:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
}

module.exports = serviceController;