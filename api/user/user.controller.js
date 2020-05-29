const {
    serviceAdd,
    serviceUpdate,
    serviceLogin,
    serviceCheck,
    serviceGetTrans,
    serviceUpdateTrans,
    serviceUpdatePet,
    serviceDeleteTrans
} = require('./user.service')
const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
const { sign } = require('jsonwebtoken')
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_PASS
    }
});
module.exports = {
    //Register
    controllerSend:(req,res)=>{
        // console.log(req.query.name);
        // console.log(req.query.email);
        // console.log(req.query.password);
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    data_user={
        nm_user:req.query.name,
        email_user:req.query.email,
        password:req.query.password,
        no_user:req.query.no_user,
        status : 0
    }
    link="http://"+req.get('host')+"/api/user/verify?id="+rand,[data_user];
    // serviceAdd(data_user,(err,result)=>{
    //     if(err){
    //         console.log(err)
    //     }
    // });
    mailOptions={
        to : req.query.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
    }
    console.log(mailOptions);
    serviceCheck(data_user,(err,results)=>{
        if(err){
            if(err === "kosong"){
                const salt = genSaltSync(10);
                data_user.password = hashSync(data_user.password, salt);
                serviceAdd(data_user);
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                        res.end("error");
                    }else{
                        console.log("Message sent: " + response.message);
                        res.end("sent");
                    }
                });
            }if(err === "verifyet"){
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                        res.end("error");
                    }else{
                        console.log("Message sent: " + response.message);
                        res.end("sent");
                    }
                });
            }if(err === "verify"){
                console.log("Already Exits ");
                res.end("terpakai");
            }else{
            console.log(err);
            return
            }
        }
    })
    },
    controllerVerify:(req,res)=>{
        console.log(req.protocol+":/"+req.get('host'));
        if((req.protocol+"://"+req.get('host'))==("http://"+host))
        {
            console.log(data_user);
            console.log("Domain is matched. Information is from Authentic email");
            if(req.query.id==rand)
            {
                console.log(data_user.email_user);
                data_status={
                    email_user:data_user.email_user,
                    status:1 
                }
                serviceUpdate(data_status);
                res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
            }
            else
            {
                console.log("email is not verified");
                res.end("<h1>Bad Request</h1>");
            }
        }
        else
        {
            res.end("<h1>Request is from unknown source");
        }
    },
    //Login
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
            const result= compareSync(body.password,results.password);
            if(result){
                req.session.loggedin=true
                req.session.email=results.email_user
                req.session.id_user=results.id_user
                // console.log(req.session.id_user);
                res.redirect('home')
            }else{
                return res.json({
                    succes:0,
                    message:"Email or password invalid"
                })
            }
        })
    },
    controllerHome:(req,res)=>{
        if(req.session.loggedin){
            // console.log(req.session.email);
            var session = req.session.email
            res.render('home', {session : session})
        }else{
            res.end("Login dolo!")
        }
    },
    controllerLogout:(req,res)=>{
        if(req.session.loggedin === true){
            req.session.loggedin = false
            res.redirect('login')
        }
        res.end()
    },
    controllerTransaksi:(req,res)=>{
        if(req.session.loggedin){
            // console.log(req.session.email);
            var data = req.session.id_user
            // console.log(data);
            serviceGetTrans(data,(err,results)=>{
                if(err){ 
                    console.log(err);
                }else if(results ==  null){
                    console.log("Tidak Berhasil");
                }else{
                    console.log(results.length);
                    res.render('userTrans',{ data:results})
                }
            })
        }else{
            res.end("Login dolo!")
        }
        
    },
    controllerUpdateTransaksi:(req,res)=>{
        var data = req.params.id
        serviceUpdateTrans(data,(err,results)=>{
            if(err){ 
                console.log(err);
            }else if(results ==  null){
                console.log("Tidak Berhasil");
            }else{
                for( var i = 0 ; i < results[0].titip.length; i++){
                    var data = results[0].titip[i].id_pet
                    serviceUpdatePet(data,(err,result2)=>{
                        if(err){ 
                            console.log(err);
                        }else if(result2 ==  null){
                            console.log("Tidak Berhasil");
                        }else{
                            console.log("Berhasil");
                        }
                    })
                }
            }
        })
    },
    controllerDeleteTransaksi:(req,res)=>{
        var data = req.params.id
        serviceDeleteTrans(data,(err,results)=>{
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
