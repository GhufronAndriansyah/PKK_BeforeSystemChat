const {
    serviceAdd,
    serviceGet,
    serviceLogin,
    serviceGetById,
    serviceUpdateTempat,
    serviceGetTrans,
    serviceGetTransaksiById,
    serviceUpdateTrans
} = require('./petugas.service')
const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
module.exports = {
    controllerDaftar:(req,res)=>{
        res.render('daftarPetugas')
    },
    controller:(req,res)=>{
        res.render('loginPetugas')
    },
    controllerAdd:(req,res)=>{
        var data = {
            nama_petugas : req.body.nama_petugas,
            email_petugas : req.body.email_petugas,
            no_petugas : req.body.no_petugas,
            password_petugas : req.body.password_petugas
        }
        const salt = genSaltSync(10);
        data.password_petugas = hashSync(data.password_petugas, salt)
        serviceAdd(data,(err,results)=>{
            if(err){
                console.log(err);
                return res.json({
                    success:false,
                    message:"Gagal Tambah"
                })
            }else{
                console.log("Berhasil Tambah");
            }
        })
    },
    controllerGet:(req,res)=>{
        serviceGet((err,results)=>{
            if(err){
                console.log(err);
                return err;
            }else if(results.lenght > 0 ){
                return res.json({
                    success:1,
                    data:results
                })
            }else{
                console.log("kosong");
                return res.json({
                    message:"Kosong"
                })
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
            const result = compareSync(body.password_petugas,results.password_petugas);
            if(result){
                req.session.loggedin=true
                req.session.email=results.email_petugas
                req.session.id_user=results.id_petugas
                var data_petugas = req.session.id_user;
                serviceGetTransaksiById(data_petugas,(err,results)=>{
                    if(err){
                        console.log(err);
                    }else if(results.length > 0){
                        res.render('homePetugas',{ data:results })
                    }else{
                        console.log("kosong");
                    }
                })
            }else{
                return res.json({
                    succes:0,
                    message:"Email or password invalid"
                })
            }
        })
    },
    controllerGetById:(req,res)=>{
        var data = req.params.id
        serviceGetById(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results == null){
                console.log("Kosong");
            }else{
                res.render('updateTempat',{data_tempat:results})
            }
        })
    },
    controllerUpdateTempat:(req,res)=>{
        var data = {
            id_tempat : req.body.id_tempat,
            nama_tempat : req.body.nama_tempat,
            lokasi_tempat : req.body.lokasi_tempat,
            harga_tempat : req.body.harga_tempat,
            keterangan_tempat : req.body.keterangan_tempat
        }
        serviceUpdateTempat(data,(err,results)=>{
            if(err){
                // console.log(err);
            }else if(results==null){
                console.log("Not Found");
            }else{
                console.log("Berhasil");
            }
        })
    },
    controllerGetTransaksi:(req,res)=>{
        var data = req.params.id
        serviceGetTrans(data,(err,results)=>{
            if(err){ 
                console.log(err);
            }else if(results ==  null){
                console.log("Tidak Berhasil");
            }else{
                // console.log(results.length);
                // res.render('homePetugas',{data1:results})
            }
        })
    },
    controllerUpdateTrans:(req,res)=>{
        var data = req.params.id
        serviceUpdateTrans(data,(err,results)=>{
            if(err){ 
                console.log(err);
            }else if(results ==  null){
                console.log("Tidak Berhasil");
            }else{
                console.log("Berhasil");
            }
        })
    }
}