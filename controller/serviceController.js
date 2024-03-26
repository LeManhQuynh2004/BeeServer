const upload = require('../config/upload');
const { Service } = require('../model/model');

const serviceController = {
    //ADD SERVICE
    // addService: ((upload.array('image', 5)), async (req, res) => {
    //     try {
    //         const data = req.body;
    //         const file = req.file;
    //         const imageUrl = file.map((item, index) => `${req.protocol}://${req.get("host")}/uploads/${item.filename}`);
    //         const newUser = new Service({
    //             name: data.name,
    //             price: data.price,
    //             image : imageUrl,
    //             describe: data.describe,
    //             location : data.location,
    //             time : data.time,
    //             utilities : data.utilities,
    //             result : data.result
    //         });
    //         // await newUser.save();
    //         console.log(newUser);
    //         res.status(200).json("POST SUCCESSFULLY");
    //     } catch (err) {
    //         res.status(500).json(err);//HTTP REQUEST CODE
    //     }
    // }),
    //GET ALL SERVICE
    getAllService: async (req, res) => {
        try {
            const services = await Service.find();
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