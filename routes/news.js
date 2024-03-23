const newsController = require("../controller/newsController");

const router = require("express").Router();

router.get('/', function(req, res, next) {
    res.render('news');
});

router.get('/data', newsController.getAllNews)
//GET AN
router.get('/data/:id', newsController.getAnNews)
//POST
router.post('/data', newsController.addNews)
//DELETE
router.delete('/data/:id', newsController.deleteNews)
//UPDATE
router.put('/data/:id', newsController.updateNews)

module.exports = router