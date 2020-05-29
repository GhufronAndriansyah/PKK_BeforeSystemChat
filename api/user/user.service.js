const db = require("../../config/connection")

module.exports = {
    //Register
    serviceAdd: (data)=>{
      db.query(
        `insert into tb_user set ?`,
        [data]
      )  
    },
    serviceUpdate:(data)=>{
        db.query(
            `update tb_user set status=? where email_user=?`
            ,[
                data.status,
                data.email_user
            ]);
    },
    serviceCheck:(data,callBack)=>{
        db.query(
            `select status from tb_user where email_user=?`,
            [data.email_user],
            (err,results)=>{
                if(err){
                    return callBack(err);
                }else if(results == 0){
                    return callBack("kosong")
                }else if(results[0].status == 0){
                    return callBack("verifyet")
                }else if(results[0].status == 1){
                    return callBack("verify")
                }else{
                    return callBack(null,results[0])
                }
            }
        )
    },

    //Login
    serviceLogin: (data,callBack)=>{ 
        // console.log(data);
        db.query(
            `select * from tb_user where email_user=? `,
            [data.email_user],(err,results)=>{
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
    //Transaksi
    serviceGetTrans:(data,callBack)=>{
        db.query(
            `SELECT * FROM tb_transaksi
            INNER JOIN tb_temtip
            ON tb_transaksi.id_tempat = tb_temtip.id_tempat
            INNER JOIN tb_petugas
            ON tb_temtip.id_petugas = tb_petugas.id_petugas
            WHERE tb_transaksi.id_user = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    for( var i = 0 ; i < results.length; i++){
                        results[i].titip = JSON.parse(results[i].titip)
                    }
                    // console.log(results);
                    return callBack(null, results)
                }
            }
        )
    },
    serviceUpdateTrans:(data,callBack)=>{
        db.query(
            `SELECT * FROM tb_transaksi where id_transaksi=?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    db.query(
                        `update tb_transaksi set status=? where id_transaksi=?`,
                        [2,data]
                    );
                    for( var i = 0 ; i < results.length; i++){
                        results[i].titip = JSON.parse(results[i].titip)
                    }
                    return callBack(null,results)
                }
            }
        )    
    },
    serviceUpdatePet:(data,callBack)=>{
        db.query(
            `update tb_pet set status=? where id_pet=?`,
            [0,data],
            (err,result2)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, result2)
                }
            }
        )
    },
    serviceDeleteTrans:(data,callBack)=>{
        db.query(
            `delete from tb_transaksi where id_transaksi=?`,
            [data],
            (err,result2)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, result2)
                }
            }
        )
    }
}