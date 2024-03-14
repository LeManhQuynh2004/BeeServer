const photosController = require("../controller/photosController");

const router = require("express").Router();

router.get('/', function(req, res, next) {
    res.render('photo');
});

router.get('/data',photosController.getAllPhoto);

router.get('/data/:id',photosController.getAnPhoto);

router.post('/data',photosController.addPhoto);

router.delete('/data/:id',photosController.deletePhoto);

router.put('/data/:id',photosController.updatePhoto);

module.exports = router;