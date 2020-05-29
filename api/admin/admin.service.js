const db = require("../../config/connection");

module.exports = {
    serviceAdd:(data,callBack)=>{
        db.query(
            `insert into tb_admin set?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    serviceLogin:(data,callBack)=>{
        db.query(
            `select * from tb_admin where email_admin=? `,
            [data.email_admin],(err,results)=>{
                // console.log(results[0] == null);
                if(err){
                    return callBack(err)
                }if(results[0] == null){
                    return callBack("tidak ada")
                }if(results[0].status == 0){
                    return callBack("verifydulu")
                }else{
                    return callBack(null,results[0])
                }
            }
        )
    },
    serviceGetUser:(callBack)=>{
        db.query(
            `select * from tb_user`,
            [],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if(results.length > 0){
                    return callBack(null,results)
                }else{
                    console.log("Kosong");
                }
            }
        )
    },
    serviceAddUser:(data,callBack)=>{
        db.query(
            `insert into tb_user set?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    serviceGetUserById:(data,callBack)=>{
        db.query(
            `select * from tb_user where id_user = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if (results.length > 0){
                    return callBack(null,results)
                }
            }
        )
    },
    serviceUpdateUser:(data,callBack)=>{
        var data_user = {
            nm_user : data.nm_user,
            no_user : data.no_user
        }
        db.query(
            `update tb_user set? where id_user = ?`,
            [data_user,data.id_user],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }

        )
    },
    serviceDeleteUser:(data,callBack)=>{
        db.query(
            `delete from tb_user where id_user = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    serviceGetPetugas:(callBack)=>{
        db.query(
            `select * from tb_petugas`,
            [],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if(results.length > 0){
                    return callBack(null,results)
                }else{
                    console.log("Kosong");
                }
            }
        )
    },
    serviceAddPetugas:(data,callBack)=>{
        db.query(
            `insert into tb_petugas set?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        ) 
    },
    serviceGetPetugasById:(data,callBack)=>{
        db.query(
            `select * from tb_petugas where id_petugas = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if (results.length > 0){
                    return callBack(null,results)
                }
            }
        )
    },
    serviceUpdatePetugas:(data,callBack)=>{
        var data_petugas = {
            nama_petugas : data.nama_petugas,
            email_petugas : data.email_petugas,
            password_petugas : data.password_petugas,
            no_petugas : data.no_petugas
        }
        db.query(
            `update tb_petugas set? where id_petugas = ?`,
            [data_petugas,data.id_petugas],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }

        )
    },
    serviceDeletePetugas:(data,callBack)=>{
        db.query(
            `delete from tb_petugas where id_petugas = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    serviceGetDokter:(callBack)=>{
        db.query(
            `select * from tb_dokter`,
            [],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if(results.length > 0){
                    return callBack(null,results)
                }else{
                    console.log("Kosong");
                }
            }
        )
    },
    serviceAddDokter:(data,callBack)=>{
        db.query(
            `insert into tb_dokter set?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )  
    },
    serviceGetDokterById:(data,callBack)=>{
        db.query(
            `select * from tb_dokter where id_dokter = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if (results.length > 0){
                    return callBack(null,results)
                }
            }
        )
    },
    serviceUpdateDokter:(data,callBack)=>{
        var data_dokter = {
            nama_dokter : data.nama_dokter,
            email_dokter : data.email_dokter,
            password_dokter : data.password_dokter,
            no_dokter : data.no_dokter
        }
        db.query(
            `update tb_dokter set? where id_dokter = ?`,
            [data_dokter,data.id_dokter],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }

        )
    },
    serviceDeleteDokter:(data,callBack)=>{
        db.query(
            `delete from tb_dokter where id_dokter = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    serviceGetPet:(callBack)=>{
        db.query(
            `select * from tb_pet inner join tb_user on tb_pet.id_user = tb_user.id_user`,
            [],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if(results.length > 0){
                    return callBack(null,results)
                }else{
                    console.log("Kosong");
                }
            }
        )
    },
    serviceAddPet:(data,callBack)=>{
        db.query(
            `insert into tb_pet set?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        ) 
    },
    serviceGetPetById:(data,callBack)=>{
        db.query(
            `select * from tb_pet where id_pet = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if (results.length > 0){
                    return callBack(null,results)
                }
            }
        )
    },
    serviceUpdatePet:(data,callBack)=>{
        var data_pet = {
            id_user : data.id_user,
            name_pet : data.name_pet,
            species_pet : data.species_pet,
            age_pet : data.age_pet,
            status : data.status
        }
        // console.log(data_pet);
        db.query(
            `update tb_pet set? where id_pet = ?`,
            [data_pet,data.id_pet],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }

        )
    },
    serviceDeletePet:(data,callBack)=>{
        db.query(
            `delete from tb_pet where id_pet = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    serviceGetTempat:(callBack)=>{
        db.query(
            `select * from tb_temtip inner join tb_petugas on tb_temtip.id_petugas = tb_petugas.id_petugas`,
            [],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if(results.length > 0){
                    return callBack(null ,results)
                }else{
                    console.log("Kosong");
                }
            }
        )
    },
    serviceAddTempat:(data,callBack)=>{
        db.query(
            `insert into tb_temtip set?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )  
    },
    serviceGetTempatById:(data,callBack)=>{
        db.query(
            `select * from tb_temtip where id_tempat = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if (results.length > 0){
                    return callBack(null,results)
                }
            }
        )
    },
    serviceUpdateTempat:(data,callBack)=>{
        var data_tempat = {
            id_petugas : data.id_petugas,
            nama_tempat : data.nama_tempat,
            lokasi_tempat : data.lokasi_tempat,
            harga_tempat : data.harga_tempat,
            harga_waktu : data.harga_waktu,
            keterangan_tempat : data.keterangan_tempat
        }
        // console.log(data_tempat);
        db.query(
            `update tb_temtip set? where id_tempat = ?`,
            [data_tempat,data.id_tempat],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }

        )
    },
    serviceDeleteTempat:(data,callBack)=>{
        db.query(
            `delete from tb_temtip where id_tempat = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    serviceGetKeranjang:(callBack)=>{
        db.query(
            `select * from tb_keranjang`,
            [],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if(results.length > 0){
                    return callBack(null,results)
                }else{
                    console.log("Kosong");
                }
            }
        )
    },
    serviceAddKeranjang:(data,callBack)=>{
        db.query(
            `insert into tb_keranjang set?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )  
    },
    serviceGetKeranjangById:(data,callBack)=>{
        db.query(
            `select * from tb_keranjang where id_keranjang = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if (results.length > 0){
                    return callBack(null,results)
                }
            }
        )
    },
    serviceUpdateKeranjang:(data,callBack)=>{
        var data_keranjang = {
            id_user : data.id_user,
            id_pet : data.id_pet,
            id_tempat : data.id_tempat,
            waktu : data.waktu,
            total_harga : data.total_harga
            }
        // console.log(data_tempat);
        db.query(
            `update tb_keranjang set? where id_keranjang = ?`,
            [data_keranjang,data.id_keranjang],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }

        )
    },
    serviceDeleteKeranjang:(data,callBack)=>{
        db.query(
            `delete from tb_keranjang where id_keranjang = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    serviceGetTransaksi:(callBack)=>{
        db.query(
            `select * from tb_transaksi`,
            [],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if(results.length > 0){
                    for( var i = 0 ; i < results.length; i++){
                        results[i].titip = JSON.parse(results[i].titip)
                    }
                    return callBack(null,results)
                }else{
                    console.log("Kosong");
                }
            }
        )
    },
    serviceGetTransaksiById:(data,callBack)=>{
        db.query(
            `select * from tb_transaksi where id_transaksi = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else if (results.length > 0){
                    return callBack(null,results)
                }
            }
        )
    },
    serviceUpdateTransaksi:(data,callBack)=>{
        var data_transaksi = {
            status : data.status,
            }
        // console.log(data_tempat);
        db.query(
            `update tb_transaksi set? where id_transaksi = ?`,
            [data_transaksi,data.id_transaksi],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }

        )
    },
    serviceDeleteTransaksi:(data,callBack)=>{
        db.query(
            `delete from tb_transaksi where id_transaksi = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    }
}