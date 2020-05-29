const {
    serviceAdd,
    serviceLogin,
    serviceGetUser,
    serviceAddUser,
    serviceGetUserById,
    serviceUpdateUser,
    serviceDeleteUser,
    serviceGetPetugas,
    serviceAddPetugas,
    serviceGetPetugasById,
    serviceUpdatePetugas,
    serviceDeletePetugas,
    serviceGetDokter,
    serviceAddDokter,
    serviceGetDokterById,
    serviceUpdateDokter,
    serviceDeleteDokter,
    serviceGetPet,
    serviceAddPet,
    serviceGetPetById,
    serviceUpdatePet,
    serviceDeletePet,
    serviceGetTempat,
    serviceAddTempat,
    serviceGetTempatById,
    serviceUpdateTempat,
    serviceDeleteTempat,
    serviceGetKeranjang,
    serviceAddKeranjang,
    serviceGetKeranjangById,
    serviceUpdateKeranjang,
    serviceDeleteKeranjang,
    serviceGetTransaksi,
    serviceGetTransaksiById,
    serviceUpdateTransaksi,
    serviceDeleteTransaksi
} = require('./admin.service')
const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
module.exports = {
    controllerAdd:(req,res)=>{
        var data = {
            nama_admin : req.body.nama_admin,
            email_admin : req.body.email_admin,
            password_admin : req.body.password_admin,
            no_admin : req.body.no_admin
        }
        const salt = genSaltSync(10);
        data.password_admin = hashSync(data.password_admin, salt)
        serviceAdd(data,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerLogin:(req,res)=>{
        const body = req.body;
        serviceLogin(body,(err,results)=>{
            if(err){
                console.log(err);
                if(err === "verifydulu"){
                    return res.json({
                        message:"Verify email dolo"
                    })
                }if(err === "tidak ada"){
                    return res.json({
                        message:"Belum terdaftar"
                    })
                }
            }if(!results){
                return res.json({
                    success:0,
                    message:" Invalid email or password"
                })
            }
            // console.log(results.id_user);
            const result = compareSync(body.password_admin,results.password_admin);
            if(result){
                req.session.loggedin=true
                req.session.email=results.email_user
                req.session.id_user=results.id_user
                // console.log(req.session.id_user);
                console.log("Berhasil Login");
            }else{
                return res.json({
                    succes:0,
                    message:"Email or password invalid"
                })
            }
        })
    },
    controllerUser:(req,res)=>{
        serviceGetUser((err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('userAdmin',{ dataUser:results })
            }else{
                console.log("kosong");
            }
        })
    },
    controllerAddUser:(req,res)=>{
        var data = {
            nm_user : req.body.nm_user,
            email_user : req.body.email_user,
            password : req.body.password,
            no_user : req.body.no_user,
            status : 1
        }
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt)
        serviceAddUser(data,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerUpdateUs:(req,res)=>{
        var data = req.params.id
        serviceGetUserById(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('updateUserAdmin', { dataUser:results })
            }else{
                console.log("Kosong");
            }
        })
    },
    controllerUpdateUser:(req,res)=>{
        var data ={
            nm_user : req.body.nm_user,
            no_user : req.body.no_user,
            id_user : req.body.id_user
        }
        serviceUpdateUser(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("Berhasil");
            }
        })
    },
    controllerDeleteUser:(req,res)=>{
        var data = req.params.id
        serviceDeleteUser(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerPetugas:(req,res)=>{
        serviceGetPetugas((err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('petugasAdmin',{ dataPetugas:results })
            }else{
                console.log("kosong");
            }
        })
    },
    controllerAddPetugas:(req,res)=>{
        var data = {
            nama_petugas : req.body.nama_petugas,
            email_petugas : req.body.email_petugas,
            password_petugas : req.body.password_petugas,
            no_petugas : req.body.no_petugas
        }
        const salt = genSaltSync(10);
        data.password_petugas = hashSync(data.password_petugas, salt)
        serviceAddPetugas(data,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerUpdatePetu:(req,res)=>{
        var data = req.params.id
        serviceGetPetugasById(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('updatePetugasAdmin', { dataPetugas:results })
            }else{
                console.log("Kosong");
            }
        })
    },
    controllerUpdatePetugas:(req,res)=>{
        var data = {
            nama_petugas : req.body.nama_petugas,
            email_petugas : req.body.email_petugas,
            password_petugas : req.body.password_petugas,
            no_petugas : req.body.no_petugas,
            id_petugas : req.body.id_petugas
        }
        serviceUpdatePetugas(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("Berhasil");
            }
        })
    },
    controllerDeletePetugas:(req,res)=>{
        var data = req.params.id
        serviceDeletePetugas(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerDokter:(req,res)=>{
        serviceGetDokter((err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('dokterAdmin',{ data:results })
            }else{
                console.log("kosong");
            }
        })
    },
    controllerAddDokter:(req,res)=>{
        var data = {
            nama_dokter : req.body.nama_dokter,
            email_dokter : req.body.email_dokter,
            password_dokter : req.body.password_dokter,
            no_dokter : req.body.no_dokter
        }
        const salt = genSaltSync(10);
        data.password_dokter = hashSync(data.password_dokter, salt)
        serviceAddDokter(data,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerUpdateDok:(req,res)=>{
        var data = req.params.id
        serviceGetDokterById(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('updateDokterAdmin', { data:results })
            }else{
                console.log("Kosong");
            }
        })
    },
    controllerUpdateDokter:(req,res)=>{
        var data = {
            nama_dokter : req.body.nama_dokter,
            email_dokter : req.body.email_dokter,
            password_dokter : req.body.password_dokter,
            no_dokter : req.body.no_dokter,
            id_dokter : req.body.id_dokter
        }
        serviceUpdateDokter(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("Berhasil");
            }
        })
    },
    controllerDeletedDokter:(req,res)=>{
        var data = req.params.id
        serviceDeleteDokter(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerPet:(req,res)=>{
        serviceGetPet((err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('petAdmin',{ data:results })
            }else{
                console.log("kosong");
            }
        })
    },
    controllerAddPet:(req,res)=>{
        var data = {
            id_user : req.body.id_user,
            name_pet : req.body.name_pet,
            species_pet : req.body.species_pet,
            age_pet : req.body.age_pet,
            status : 0
        }
        serviceAddPet(data,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerUpdateP:(req,res)=>{
        var data = req.params.id
        serviceGetPetById(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('updatePetAdmin', { data:results })
            }else{
                console.log("Kosong");
            }
        })
    },
    controllerUpdatePet:(req,res)=>{
        var data = {
            id_user : req.body.id_user,
            name_pet : req.body.name_pet,
            species_pet : req.body.species_pet,
            age_pet : req.body.age_pet,
            status : req.body.status,
            id_pet: req.body.id_pet
        }
        serviceUpdatePet(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("Berhasil");
            }
        })
    },
    controllerDeletedPet:(req,res)=>{
        var data = req.params.id
        serviceDeletePet(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerTempat:(req,res)=>{
        serviceGetTempat((err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('tempatAdmin',{ data:results })
            }else{
                console.log("kosong");
            }
        })
    },   
    controllerAddTempat:(req,res)=>{
        var waktu = "Per/Days"
        var data = {
            id_petugas : req.body.id_petugas,
            nama_tempat : req.body.nama_tempat,
            lokasi_tempat : req.body.lokasi_tempat,
            harga_tempat : req.body.harga_tempat,
            harga_waktu : waktu,
            keterangan_tempat : req.body.keterangan_tempat
        }
        serviceAddTempat(data,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerUpdateTem:(req,res)=>{
        var data = req.params.id
        serviceGetTempatById(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('updateTempatAdmin', { data:results })
            }else{
                console.log("Kosong");
            }
        })
    },
    controllerUpdateTempat:(req,res)=>{
        var waktu = "Per/Days"
        var data = {
            id_petugas : req.body.id_petugas,
            nama_tempat : req.body.nama_tempat,
            lokasi_tempat : req.body.lokasi_tempat,
            harga_tempat : req.body.harga_tempat,
            harga_waktu : waktu,
            keterangan_tempat : req.body.keterangan_tempat,
            id_tempat: req.body.id_tempat
        }
        serviceUpdateTempat(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("Berhasil");
            }
        })
    },
    controllerDeletedTempat:(req,res)=>{
        var data = req.params.id
        serviceDeleteTempat(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerKeranjang:(req,res)=>{
        serviceGetKeranjang((err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('keranjangAdmin',{ data:results })
            }else{
                console.log("kosong");
            }
        })
    },
    controllerAddKeranjang:(req,res)=>{
        var data = {
            id_user : req.body.id_user,
            id_pet : req.body.id_pet,
            id_tempat : req.body.id_tempat,
            waktu : req.body.waktu,
            total_harga : req.body.total_harga
        }
        serviceAddKeranjang(data,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerUpdateKer:(req,res)=>{
        var data = req.params.id
        serviceGetKeranjangById(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('updateKeranjangAdmin', { data:results })
            }else{
                console.log("Kosong");
            }
        })
    },
    controllerUpdateKeranjang:(req,res)=>{
        var data = {
            id_user : req.body.id_user,
            id_pet : req.body.id_pet,
            id_tempat : req.body.id_tempat,
            waktu : req.body.waktu,
            total_harga : req.body.total_harga,
            id_keranjang: req.body.id_keranjang
        }
        serviceUpdateKeranjang(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("Berhasil");
            }
        })
    },
    controllerDeletedKeranjang:(req,res)=>{
        var data = req.params.id
        serviceDeleteKeranjang(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("berhasil");
            }
        })
    },
    controllerTransaksi:(req,res)=>{
        serviceGetTransaksi((err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('transaksiAdmin',{ data:results })
            }else{
                console.log("kosong");
            }
        })
    },
    controllerUpdateTrans:(req,res)=>{
        var data = req.params.id
        serviceGetTransaksiById(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results.length > 0){
                res.render('updateTransaksiAdmin', { data:results })
            }else{
                console.log("Kosong");
            }
        })
    },
    controllerUpdateTransaksi:(req,res)=>{
        var data = {
            id_transaksi : req.body.id_transaksi,
            status : req.body.status
        }
        serviceUpdateTransaksi(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("Berhasil");
            }
        })
    },
    controllerDeletedTransaksi:(req,res)=>{
        var data = req.params.id
        serviceDeleteTransaksi(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("gagal");
            }else{
                console.log("berhasil");
            }
        })
    }
}