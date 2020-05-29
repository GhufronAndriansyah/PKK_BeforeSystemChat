const db = require("../../config/connection");

module.exports = {
    serviceAdd:(data,callBack)=>{
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
    serviceLogin:(data,callBack)=>{
        db.query(
            `select * from tb_dokter where email_dokter=? `,
            [data.email_dokter],(err,results)=>{
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
    }


}