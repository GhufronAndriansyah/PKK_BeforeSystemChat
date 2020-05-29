const db = require("../../config/connection")

module.exports = {
    addPet:(data_pet,callBack)=>{
        db.query(
            `select * from tb_user where email_user = ?`,
            [data_pet.email_user],
            (err,results)=>{
                if(err){
                    // console.log("salah")
                    // console.log(err);
                    return callBack(err)
                }else{
                    data_hewan = {
                        id_user : results[0].id_user,
                        species_pet : data_pet.species_pet,
                        name_pet : data_pet.name_pet,
                        age_pet : data_pet.age_pet,
                        status : 0
                    }
                    // console.log(data_hewan)
                    db.query(
                        `insert into tb_pet set ?`,
                        [   
                            data_hewan
                        ]
                    );
                    return callBack(null,results) 
                }
            }
        )
    }
}