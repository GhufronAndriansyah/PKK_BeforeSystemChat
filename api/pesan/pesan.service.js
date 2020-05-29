const db = require("../../config/connection")

module.exports = {
    serviceGet:(callBack)=>{
        db.query(
            `select * from tb_temtip`,
            (err,results)=>{
                if(err){
                    console.log("salah");
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    servicePesById:(id,callBack)=>{
        db.query(
            `select * from tb_temtip where id_tempat = ?`,[id],
            (err,results)=>{
                if(err){
                    console.log("salah");
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    controllerGetUser:(id,callBack)=>{
        // console.log(id)
        db.query(
            `select * from tb_pet where id_user=? AND status = ?`,[id,0],
            (err,hasil)=>{
                if(err){
                    console.log("salah");
                    return callBack(err)
                }else{
                    // console.log(hasil); 
                    return callBack(null,hasil)
                }
            }
        )
    },
    addKer:(data,callBack)=>{
        var status = 1;
        db.query(
            `update tb_pet set status=? where id_pet = ? `,
            [
                status,
                data.id_pet
            ],
            (err,berhasil)=>{
                // console.log("holla");
                if(err){
                    return callBack(err)
                }else{
                    db.query(
                        `insert into tb_keranjang set ?`,
                        [data]
                    );
                    return callBack(null, berhasil)
                }
            }
        )
    },
    serviceGetHamper:(id_user,callBack)=>{
        db.query(
            `SELECT tb_keranjang.*,tb_pet.*, tb_temtip.*    
            FROM tb_keranjang
            JOIN tb_pet
            ON tb_keranjang.id_pet = tb_pet.id_pet
            JOIN tb_temtip
            ON tb_keranjang.id_tempat = tb_temtip.id_tempat
            WHERE tb_keranjang.id_user = ?`,
            [id_user],
            (err,resu)=>{
                if(err){
                    return callBack(err)
                }else{
                    // console.log(resu);
                    return callBack(null,resu)
                }
            }
        )
    },
    serviceDel:(data,callBack)=>{
        db.query(
            `delete from tb_keranjang where id_keranjang = ?`,
            [data.id_keranjang],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    db.query(
                        `update tb_pet set status=? where id_pet=?`,
                        [
                            0,
                            data.id_pet
                        ]
                    );
                    return callBack(null, results)
                }
            }
        )
    },
    addTrans:(data,callBack)=>{
        console.log(data);
        db.query(
            `SELECT * FROM tb_keranjang 
            INNER JOIN tb_pet ON tb_keranjang.id_pet = tb_pet.id_pet 
            INNER JOIN tb_temtip ON tb_keranjang.id_tempat = tb_temtip.id_tempat 
            WHERE tb_keranjang.id_user = ?`,
            [data.id_user],
            (err,res)=>{
                if(err){
                    return callBack(err)
                }else if(res.length > 0 ){
                    let titip = [];
                    let total = [];
                    res.map((item,i)=>{
                        titip.push({
                            id_pet: item.id_pet,
                            name_pet : item.name_pet,
                            age_pet: item.age_pet,
                            species_pet : item.species_pet
                        });
                        total.push(Number(item.total_harga));
                        if (titip.length === res.length) {
                            const sumValues = obj =>
                            Object.values(obj).reduce((a, b) => a + b);
                            const barangku = JSON.stringify(titip);
                            const totalku = sumValues(total);
                            
                            // console.log(barangku);
                            // console.log(totalku);
                            console.log(res[0].waktu);
                            db.query(
                                `INSERT INTO tb_transaksi (id_user,id_tempat,titip,waktu,total_harga,kode,status) VALUES (?,?,?,?,?,?,?)`,
                                [data.id_user,res[0].id_tempat,barangku,res[0].waktu,totalku,data.kode,0],
                                (err,inserted)=>{
                                    if(err){
                                        console.log(err);
                                    }else if(inserted){
                                        db.query(
                                            `DELETE FROM tb_keranjang WHERE id_user = ?`,
                                            [data.id_user],
                                            (err,deleted)=>{
                                                if(err){
                                                    console.log(err);
                                                }else if (deleted){
                                                    titip.map((ttp,i)=>{
                                                        // console.log(ttp);
                                                        db.query(
                                                            "UPDATE tb_pet SET status = ? WHERE name_pet = ?",
                                                            [2,ttp.name_pet],
                                                            (err,updated)=>{
                                                                if(err){
                                                                    console.log(err);
                                                                }else if(updated){
                                                                    console.log("Success!");
                                                                }
                                                            }
                                                        );
                                                    })
                                                }
                                            }
                                        );
                                    }
                                }
                            )
                        }

                    });
                }
            }
        )
    },
    serviceTransDel(data,callBack){
        console.log(data);
        db.query(
            `select titip from tb_transaksi where id_transaksi=?`,
            [data],
            (err,selected)=>{
                // console.log(selected);
                if(err){
                    console.log(err);
                }else if (selected.length > 0){
                    let titip=[];
                    selected.map((slct,i)=>{
                        titip = JSON.parse(slct.titip)
                        // console.log(titip);
                        titip.map((ttp,i)=>{
                            console.log(ttp.name_pet);
                            db.query(
                                `update tb_pet set status = ? where name_pet = ?`,
                                [0,ttp.name_pet],
                                (err,updated)=>{
                                    // console.log("masuk update");
                                    // console.log(updated.length);
                                    if(err){
                                        console.log(err);
                                    }else if(updated){
                                        db.query(
                                            `delete from tb_transaksi where id_transaksi = ?`,
                                            [data],
                                            (err,results)=>{
                                                if(err){
                                                    console.log(err);
                                                }else if(results){
                                                    console.log("Success Del");
                                                }
                                            }
                                        )
                                    }else{
                                        console.log("Gagal Update");
                                    }
                                }
                            )
                        })
                        // console.log(selected);
                    })
                }else{
                    console.log("Kosong transaksi");
                }
            }
        )

    },
    serviceGetTrans:(data,callBack)=>{
        db.query(
            `select * from tb_transaksi where id_user`,
            [data],
            (err,selected)=>{
                if(err){
                    console.log(err);
                    return callBack(err)
                }else if(selected.length > 0){
                    let data_user = [];
                    selected.map((slct,i)=>{
                        data_user = JSON.parse(slct.titip)
                        data_user.map((dataUser,i)=>{
                            // console.log(dataUser);
                            return callBack(dataUser)
                        })
                        
                    })
                }else{
                    console.log("Transaksi Kosong");
                }
            }
        )
    }
}