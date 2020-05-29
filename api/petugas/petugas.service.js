const db = require("../../config/connection");

module.exports = {
    serviceAdd:(data,callBack)=>{
        db.query(
            `insert into tb_petugas set ?`,
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
    serviceGet:(callBack)=>{
        db.query(
            `select * from tb_petugas`,
            (err,results)=>{
                if(err){
                    console.log(err);
                }else if(results.length = 0){
                    return callBack(null)
                }else{
                    return callBack(results)
                }
            }
        )
    },
    serviceLogin:(data,callBack)=>{ 
        // console.log(data);
        db.query(
            `select * from tb_petugas where email_petugas=? `,
            [data.email_petugas],(err,results)=>{
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
    serviceGetById:(data,callBack)=>{
        db.query(
            `select * from tb_temtip INNER JOIN tb_petugas 
            ON tb_temtip.id_petugas = tb_petugas.id_petugas
            where tb_temtip.id_petugas = ?`,
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
    serviceUpdateTempat:(data,callBack)=>{
        db.query(
            `select id_tempat from tb_temtip where id_tempat`,
            [data.id_tempat],
            (err,results)=>{
                if(err){
                    console.log("Error");
                    console.log(err);
                }else if(results.length > 0){
                    db.query(
                        `update tb_temtip set? where id_tempat = ?`,
                        [data,data.id_tempat]
                    )
                    return callBack(null,results)
                }else{
                    console.log("Not Found");
                }
            }
        )
    },
    serviceGetTrans:(data,callBack)=>{
        db.query(
            `select id_tempat from tb_temtip where id_petugas = ?`,
            [data],
            (err,sel)=>{
                // console.log(sel[0].id_tempat);
                if(err){
                    console.log(err);
                    return err;
                }else if(sel.length > 0){
                    db.query(
                        `select * from tb_transaksi 
                        inner join tb_user on tb_transaksi.id_user = tb_user.id_user
                        where tb_transaksi.id_tempat = ?`,
                        [sel[0].id_tempat],
                        (err,sel1)=>{
                            // console.log(sel[0].id_tempat);
                            if(err){
                                console.log(err);
                            }else if(sel1.length > 0){
                                let transaksi = [];
                                sel1.map((item, i) => {
                                    transaksi.push({
                                        user : item.nm_user,
                                        titip: JSON.parse(item.titip),
                                        waktu: item.waktu,
                                        total_harga: item.total_harga,
                                        kode: item.kode
                                    });
                                    // console.log(transaksi);
                                      return callBack(transaksi);
                                  });
                            }else{
                                console.log("Kosong");
                            }
                        }
                    )
                }else{
                    console.log("tempat tidak ditemukan");
                }
            }
        )
    },
    serviceGetTransaksiById:(data,callBack)=>{
        db.query(
            `SELECT * FROM tb_temtip
            INNER JOIN tb_transaksi
            ON tb_temtip.id_tempat = tb_transaksi.id_tempat
            INNER JOIN tb_petugas
            ON tb_temtip.id_petugas = tb_petugas.id_petugas
            WHERE tb_temtip.id_petugas = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    for( var i = 0 ; i < results.length; i++){
                        results[i].titip = JSON.parse(results[i].titip)
                    }
                    return callBack(null, results)
                }
            }
        )
    },
    serviceUpdateTrans:(data,callBack)=>{
        db.query(
            `update tb_transaksi set status=? where id_transaksi = ?`,
            [1,data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results)
                }
            }
        )
    }
}