const { Service } = require('../model/model');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'plays',
    api_key: '819245511475772',
    api_secret: 'I9ml-5nJhk5LDTEEMTBtFdq9nW4',
    secure: true
});
console.log(cloudinary.config());

const serviceController = {
    //ADD SERVICE
    addService: async (req, res) => {
        try {
            const newService = new Service(req.body);
            await newService.save();
            res.status(200).json("Save SuccessFully !")
        } catch (err) {
            res.status(500).json(err);//HTTP REQUEST CODE
        }
    },
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

    postImage: async (imagePath) => {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };
        try {
            // Upload the image
            const result = await cloudinary.uploader.upload(imagePath, options);
            console.log(result);
            return result.public_id;
        } catch (error) {
            console.error(error);
        }
    },
    uploadImage: async (req,res) => {
        try {
            const path = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';
            const imageUri = await this.postImage(path)
            if(imageUri != null){
                res.send(imageUri)
            }else{
                res.send("Xẩy ra lỗi")
            }
        } catch (error) {
            res.send("Xẩy ra lỗi Upload Image")
        }
    },
}

module.exports = serviceController;