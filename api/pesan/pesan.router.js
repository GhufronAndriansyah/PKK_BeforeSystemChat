const {
    controller,
    controllerPes,
    controllerPesById,
    controllerKeranjang,
    controllerKerDel,
    controllerTrans,
    controllerTransDel,
    controllerTransGet
} = require('./pesan.controller')
const router = require('express').Router()
 
router.get('/',controller)
router.get('/pesan',controllerPes)
router.get('/pesan/:id',controllerPesById)
router.post('/pesan/keranjang',controllerKeranjang)
router.post('/pesan/keranjang/delete',controllerKerDel)
router.post('/pesan/transaksi',controllerTrans)
router.get('/pesan/transaksi/delete/:id',controllerTransDel)
router.get('/pesan/transaksi/get/:id',controllerTransGet)



module.exports = router 