const {
    serviceGet,
    servicePesById,
    controllerGetUser,
    addKer,
    serviceGetHamper,
    serviceDel,
    addTrans,
    serviceTransDel,
    serviceGetTrans
} = require('./pesan.service')

module.exports = {
    controller:(req,res)=>{
        serviceGet((err,results)=>{
            if(err){
                // console.log(err);
            }if(!results){
                console.log("kosong");
            }else{
                // console.log(results);
                res.render('homeP',{data:results});
            }
        })

    },
    controllerPes:(req,res)=>{
        res.render("pesan")
    },
    controllerPesById:(req,res)=>{
        if(req.session.loggedin){
            var id = req.params.id
            // console.log(id);
            servicePesById(id,(err,results)=>{
                if(err){
                    console.log(err);
                }if(!results){
                    console.log("kosong");
                }else{
                    var data_id = req.session.id_user
                    // console.log("lol");
                    // console.log(req.session.id_user);
                    controllerGetUser(data_id,(err,hasil)=>{
                        if(err){
                            console.log(err); 
                        }if(!results){
                            console.log("kosong");
                        }else{
                            serviceGetHamper(data_id,(err,resu)=>{
                                if(err){
                                    console.log(err);
                                }if(!resu){
                                    console.log("Resu Kosong");
                                }else{
                                    // console.log(resu[0].name_pet);
                                    res.render('Pesan',{data:results, dataPet:hasil, session:data_id, dataKer:resu});

                                }
                            })
                        }
                    })                
                }
            })
        }else{
            res.end("Login dolo!")
        }
        
    },
    controllerKeranjang:(req,res)=>{
        var data = {
            id_user : parseInt(req.body.id_user),
            id_pet : parseInt(req.body.id_pet),
            id_tempat : parseInt(req.body.id_tempat),
            total_harga : parseInt(req.body.harga) * req.body.waktu,
            waktu : parseInt(req.body.waktu)
        }
        // console.log(data);
        addKer(data,(err,berhasil)=>{
            if(err){
                console.log(err);
            }else{
                serviceGetHamper(data.id_user,(err,resu)=>{
                    if(err){
                        console.log(err);
                    }if(!resu){
                        console.log("keranjang kosong");
                        next();
                    }else{
                        servicePesById(data.id_tempat,(err,results)=>{
                            if(err){
                                console.log(err);
                            }if(!results){
                                console.log("kosong");
                            }else{
                                // var data_id = data.id_user
                                // console.log(data.id_user);
                                controllerGetUser(data.id_user,(err,hasil)=>{
                                    if(err){
                                        console.log(err); 
                                    }if(!hasil){
                                        console.log("kosong");
                                    }else{
                                        //  console.log(resu);
                                        res.render('pesan',
                                        {
                                            data:results, dataPet:hasil, 
                                            session:data.id_user, dataKer:resu
                                        })
                                    }
                                })                
                            }
                        })  
                    }
                })

            }
        })
    },
    controllerKerDel:(req,res)=>{
        var data = {
            id_keranjang : req.body.id_keranjang,
            id_pet : req.body.id_pet,
            id_user : req.body.id_user,
            id_tempat : req.body.id_tempat
        }
        serviceDel(data,(err,results)=>{
            if(err){
                console.log(err);
            }if(!results){
                console.log("Not Found");
            }else{
                serviceGetHamper(data.id_user,(err,resu)=>{
                    if(err){
                        console.log(err);
                    }if(!resu){
                        console.log("keranjang kosong");
                        next();
                    }else{
                        servicePesById(data.id_tempat,(err,results)=>{
                            if(err){
                                console.log(err);
                            }if(!results){
                                console.log("kosong");
                            }else{
                                // var data_id = data.id_user
                                // console.log(data.id_user);
                                controllerGetUser(data.id_user,(err,hasil)=>{
                                    if(err){
                                        console.log(err); 
                                    }if(!hasil){
                                        console.log("kosong");
                                    }else{
                                        //  console.log(resu);
                                        res.render('pesan',
                                        {
                                            data:results, dataPet:hasil, 
                                            session:data.id_user, dataKer:resu
                                        })
                                    }
                                })                
                            }
                        })  
                    }
                })
            }
        })
    },
    controllerTrans:(req,res)=>{
        var data = {
            id_user : parseInt(req.body.id_user),
            kode : parseInt(req.body.kode)
        }
        // console.log(data);
        addTrans(data,(err,res)=>{
            if(err){
                console.log(err);
            }if(!res){
                console.log("Keranjang Kosong");
            }else{
                console.log("success!");
            }
        })
    },
    controllerTransGet:(req,res)=>{
        var data = req.params.id
        serviceGetTrans(data,(err,results)=>{
            if(err){
                console.log("gagal");
            }else if(!results){
                console.log("Not Found");
            }else{
                console.log("Berhasil");
            }
        })
    },
    controllerTransDel:(req,res)=>{
        var data = req.params.id
        serviceTransDel(data,(err,results)=>{
            if(err){
                console.log(err);
            }else if(!results){
                console.log("Not Found");
            }else{
                console.log("Deleted");
            }
        })
    }
}