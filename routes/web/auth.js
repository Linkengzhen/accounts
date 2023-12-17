var express = require('express');
const shortid = require('shortid');
var router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const UserModel = require("../../models/AuthModel");
const moment = require("moment");
const md5 = require('md5');

// const adapter = new FileSync(__dirname + '/../data/db.json')
// const db = low(adapter)
/* GET home page. */
router.get('/reg',(req,res,next)=>{
    res.render('auth/reg');
});

router.post('/reg',(req,res,next)=>{
    UserModel.create({...req.body, password: md5(req.body.password)}).then((data,err)=>{
        if (err) {
            res.status(500).send('注册失败,请重试~~')
        }
        res.render('success',{msg:'注册成功~~',url:'/auth/login'})
    })
})

router.get('/login',(req,res,next)=>{
    res.render('auth/login');
})

router.post('/login',(req,res,next)=>{
    let {username,password} = req.body;
    UserModel.findOne({username:username,password:md5(password)}).then(data=>{
        if (!data) {
            return res.send('登录失败,用户名或密码错误~~')
        } else {
            req.session.username = data.username;
            req.session._id = data._id;
            res.render('success',{msg:'登录成功~~',url:'/account'})
        }
    },err=>{
        res.status(500).send('登录失败,请重试~~')
    })
})

router.post('/logout',(req,res,next)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功~~',url:'/login'})
    });
})

module.exports = router;
