const {
    controller,
    controllerAdd,
    controllerGet,
    controllerLogin,
    controllerDaftar,
    controllerGetById,
    controllerUpdateTempat,
    controllerGetTransaksi,
    controllerUpdateTrans
    
} = require('./petugas.controller');
const router = require('express').Router();

router.get('/daftar', controllerDaftar)
router.get('/', controller)
router.post('/', controllerAdd)
router.get('/petugas', controllerGet)
router.post('/auth', controllerLogin)
router.get('/:id', controllerGetById)
// router.get('/petugas', controllerGet)
router.get('/transaksi/update/:id', controllerUpdateTrans)
router.post('/updateTem',controllerUpdateTempat)
router.get('/getTrans/:id',controllerGetTransaksi)

module.exports = router