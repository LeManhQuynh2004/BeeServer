const { Photo, User } = require('../model/model')

const photosController = {
    //POST PHOTO
    addPhoto: async (req, res) => {
        try {
            // Dữ liệu từ yêu cầu có thể được truy cập thông qua req.body
            const newPhoto = new Photo(req.body);
            const savePhoto = await newPhoto.save();//phương thức save() được sử dụng để lưu một đối tượng vào cơ sở dữ liệu MongoDB
            if (req.body.user) {
                const user = await User.findById(req.body.user);
                await user.updateOne({ $push: { photos: savePhoto._id } });
            }
            res.status(200).json(savePhoto);
        } catch (err) {
            res.status(500).json(err); // Internal Server Error
        }
    },
    getAllPhoto: async (req, res) => {
        try {
            const photos = await Photo.find().populate('user')
            res.status(200).json(photos);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAnPhoto: async (req, res) => {
        try {
            const photo = await Photo.findById(req.params.id).populate('user')
            res.status(200).json(photo);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updatePhoto: async (req, res) => {
        try {
            const photo = await Photo.findById(req.params.id);
            await photo.updateOne({ '$set': req.body });
            res.status(200).json("Update SuccessFully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deletePhoto: async (req, res) => {
        try {
            await User.updateMany({ photos: req.params.id }, { $pull: req.params.id })
            //User có nhiều ảnh
            //dùng lênh updateMany tìm ảnh của tác giả đó và lấy ra khỏi array đó
            await Photo.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successfully")
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = photosController;