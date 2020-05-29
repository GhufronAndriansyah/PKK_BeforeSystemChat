const {
    controllerLogin,
    controllerSend,
    controllerVerify,
    controllerHome,
    controllerLogout,
    controllerTransaksi,
    controllerUpdateTransaksi,
    controllerDeleteTransaksi
} = require('./user.controller')
const router = require('express').Router()

//Register
router.get('/',function(req,res)
{
	res.sendfile('index.html');
});

router.get('/send',controllerSend);

router.get('/verify',controllerVerify)

//Login
router.get('/login',function(req,res){
    res.render('login')
})

router.post('/auth', controllerLogin)

router.get('/home', controllerHome)

router.get('/metu', controllerLogout)

//Transaksi
router.get('/transaksi', controllerTransaksi)
router.get('/transaksi/update/:id', controllerUpdateTransaksi)
router.get('/transaksi/delete/:id', controllerDeleteTransaksi)

module.exports = router