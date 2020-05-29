const {
    controllerPet,
    controllerReg
} = require('./pet.controller')
const router = require('express').Router()

router.get('/',controllerPet)
router.post('/regpet',controllerReg)


module.exports = router