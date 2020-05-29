require("dotenv").config();
const session = require('express-session')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const userRouter = require('./api/user/user.router');
const petRouter = require('./api/pet/pet.router');
const pesanRouter = require('./api/pesan/pesan.router');
const petugasRouter = require('./api/petugas/petugas.router');
const dokterRouter = require('./api/dokter/dokter.router');
const adminRouter = require('./api/admin/admin.router');

app.use(express.json());
app.set('view engine','ejs')
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized:true
    })
)
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use('/api/user', userRouter);
app.use('/api/pet', petRouter);
app.use('/api/pesan', pesanRouter);
app.use('/api/petugas', petugasRouter);
app.use('/api/dokter', dokterRouter);
app.use('/api/admin', adminRouter);

app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});