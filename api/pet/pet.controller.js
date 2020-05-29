const {
    addPet
} = require('./pet.service')

module.exports = {
    controllerPet:(req,res)=>{
        if(req.session.loggedin){
            // console.log(req.session.email);
            var session = req.session.email
            res.render('regPet', {session : session})
        }else{
            res.end("Login dolo!")
        }
    },
    controllerReg:(req,res)=>{
        data_pet = req.body
        addPet(data_pet,(err,results)=>{
            if(err){
                console.log(err);
            }if(!results){
                console.log("Kosong");
            }else{
                // console.log("hi"); 
                if(req.session.loggedin){
                    // console.log(req.session.email);
                    var session = req.session.email
                    res.render('home', {session : session})
                }else{
                    res.end("Login dolo!")
                }
            }
        })
    }
}