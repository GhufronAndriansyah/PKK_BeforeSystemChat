const {
    serviceAdd,
    serviceLogin
} = require('./dokter.service')
const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
module.exports = {
    controllerAdd:(req,res)=>{
        var data = {
            nama_dokter : req.body.nama_dokter,
            email_dokter : req.body.email_dokter,
            password_dokter : req.body.password_dokter,
            no_dokter : req.body.no_dokter
        }
        const salt = genSaltSync(10);
        data.password_dokter = hashSync(data.password_dokter, salt)
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
            const result = compareSync(body.password_dokter,results.password_dokter);
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
    }
}