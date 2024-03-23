const ConfigUpload = require('../config/upload');
const { User } = require('../model/model')

const userController = {
    //POST USER
    addUser: (ConfigUpload.single('avatar'), async (req, res) => {
        try {
            const data = req.body;
            console.log(data)
            // const file = req.file;
            // if (!file) {
            //     return res.status(400).json({ error: 'No file uploaded' });
            // }
            // const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.name}`;
            // const newUser = new User({
            //     username: data.username,
            //     email: data.email,
            //     password: data.password,
            //     avatar: imageUrl,
            //     role: data.role,
            // });
            // await newUser.save();
            // res.status(200).json("Add successFully");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

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