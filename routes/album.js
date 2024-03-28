const albumController = require('../controller/AlbumController');

const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.render('album');
});

router.get("/data", albumController.getAllData);

router.post("/data", albumController.postData);

router.get("/data/:id", albumController.getAnData);

router.delete("/data/:id", albumController.deleteData);

router.put("/data/:id", albumController.updateData);

module.exports = router;
