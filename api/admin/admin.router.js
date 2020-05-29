const {
    controllerAdd,
    controllerLogin,
    controllerUser,
    controllerAddUser,
    controllerUpdateUs,
    controllerUpdateUser,
    controllerDeleteUser,
    controllerPetugas,
    controllerAddPetugas,
    controllerUpdatePetu,
    controllerUpdatePetugas,
    controllerDeletePetugas,
    controllerDokter,
    controllerAddDokter,
    controllerUpdateDok,
    controllerUpdateDokter,
    controllerDeletedDokter,
    controllerPet,
    controllerAddPet,
    controllerUpdateP,
    controllerUpdatePet,
    controllerDeletedPet,
    controllerTempat,
    controllerAddTempat,
    controllerUpdateTem,
    controllerUpdateTempat,
    controllerDeletedTempat,
    controllerKeranjang,
    controllerAddKeranjang,
    controllerUpdateKer,
    controllerUpdateKeranjang,
    controllerDeletedKeranjang,
    controllerTransaksi,
    controllerUpdateTrans,
    controllerUpdateTransaksi,
    controllerDeletedTransaksi
} = require('./admin.controller');

const router = require('express').Router()

//Daftar Admin
router.get('/daftarAdmin',(req,res)=>{
    res.render('daftarAdmin')
})
router.post('/',controllerAdd)
//Login Admin
router.get('/login',(req,res)=>{
    res.render('loginAdmin')
})
router.post('/login',controllerLogin)

//User
router.get('/user', controllerUser)
router.get('/user/daftar',(req,res)=>{
    res.render('daftarUserAdmin')
})
router.post('/user', controllerAddUser)
router.get('/user/update/:id', controllerUpdateUs)
router.post('/user/update', controllerUpdateUser)
router.get('/user/delete/:id', controllerDeleteUser)

//Petugas
router.get('/petugas', controllerPetugas)
router.get('/petugas/daftar',(req,res)=>{
    res.render('daftarPetugasAdmin')
})
router.post('/petugas', controllerAddPetugas)
router.get('/petugas/update/:id', controllerUpdatePetu)
router.post('/petugas/update', controllerUpdatePetugas)
router.get('/petugas/delete/:id', controllerDeletePetugas)

//Dokter
router.get('/dokter', controllerDokter)
router.get('/dokter/daftar',(req,res)=>{
    res.render('daftarDokterAdmin')
})
router.post('/dokter', controllerAddDokter)
router.get('/dokter/update/:id', controllerUpdateDok)
router.post('/dokter/update', controllerUpdateDokter)
router.get('/dokter/delete/:id', controllerDeletedDokter)

//Pet
router.get('/pet', controllerPet)
router.get('/pet/daftar',(req,res)=>{
    res.render('daftarPetAdmin')
})
router.post('/pet', controllerAddPet)
router.get('/pet/update/:id', controllerUpdateP)
router.post('/pet/update', controllerUpdatePet)
router.get('/pet/delete/:id', controllerDeletedPet)

//Tempat
router.get('/tempat', controllerTempat)
router.get('/tempat/daftar',(req,res)=>{
    res.render('daftarTempatAdmin')
})
router.post('/tempat', controllerAddTempat)
router.get('/tempat/update/:id', controllerUpdateTem)
router.post('/tempat/update', controllerUpdateTempat)
router.get('/tempat/delete/:id', controllerDeletedTempat)

//Keranjang
router.get('/keranjang', controllerKeranjang)
router.get('/keranjang/daftar',(req,res)=>{
    res.render('daftarKeranjangAdmin')
})
router.post('/keranjang', controllerAddKeranjang)
router.get('/keranjang/update/:id', controllerUpdateKer)
router.post('/keranjang/update', controllerUpdateKeranjang)
router.get('/keranjang/delete/:id', controllerDeletedKeranjang)

//Transaksi
router.get('/transaksi', controllerTransaksi)
router.get('/transaksi/update/:id', controllerUpdateTrans)
router.post('/transaksi/update', controllerUpdateTransaksi)
router.get('/transaksi/delete/:id', controllerDeletedTransaksi)

module.exports = router