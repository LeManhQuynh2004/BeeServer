const { Album } = require("../model/model")

const albumController = {
    //GET ALL
    getAllData: async (req, res) => {
        try {
            const albums = await Album.find();
            res.status(200).json(albums)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //POST
    postData: async (req, res) => {
        try {
            const album = new Album(req.body);
            const saveAlbum = album.save();
            res.status(200).json(saveAlbum)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //GET AN
    getAnData: async (req, res) => {
        try {
            const album = await Album.findById(req.params.id);
            res.status(200).json(album)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //DELETE
    deleteData: async (req, res) => {
        try {
            const album = await Album.findByIdAndDelete(req.params.id);
            res.status(200).json(album)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateData: async (req, res) => {
        try {
            const album = await Album.findById(req.params.id);
            const updateAlbum = await album.updateOne({ "$set": req.body });
            res.status(200).json(updateAlbum)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //UPDATE
}

module.exports = albumController