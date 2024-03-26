const upload = require("../config/upload");
const newsController = require("../controller/newsController");
const { News, Category } = require("../model/model");

const router = require("express").Router();

router.get('/', function (req, res, next) {
    res.render('news');
});

router.get('/data', newsController.getAllNews)
//POST
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;
        // Dữ liệu từ yêu cầu có thể được truy cập thông qua req.body

        if (!file || file.length === 0) {
            return res.status(400).json({ message: "No files uploaded." });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const createNew = new News({
            title: data.title,
            content: data.content,
            image: imageUrl,
            date: `${day}/${month}/${year}`,
            quantity_View: 0,
            source: "Bee Studio",
            category: data.category
        })
        await createNew.save();
        if (req.body.category) {
            const category = await Category.findById(req.body.category);
            await category.updateOne({ $push: { news: createNew._id } });
        }
        res.status(200).json(createNew);
    } catch (err) {
        res.status(500).json(err);
        res.status(500).json({ message: "Internal server error." });
    }
})
//GET AN
router.get('/data/:id', newsController.getAnNews)
//DELETE
router.delete('/data/:id', newsController.deleteNews)
//UPDATE
router.put('/data/:id', newsController.updateNews)

module.exports = router