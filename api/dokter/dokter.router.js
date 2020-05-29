const {
    controllerAdd,
    controllerLogin
} = require('./dokter.controller');
const router = require('express').Router()

router.post('/', controllerAdd)
router.get('/daftar',(req,res)=>{
    res.render('daftarDokter')
})
router.get('/loginDokter',(req,res)=>{
    res.render('loginDokter')
})
router.post('/login', controllerLogin)
// router.post('/', controllerAdd)
// router.get('/dokter', controllerGet)

module.exports = router