const express = require('express');
const router = express.Router();
const UserModel = require("../../models/AuthModel");
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {secret} = require('../../config/config')


router.post('/login',(req,res,next)=>{
    let {username,password} = req.body;
    UserModel.findOne({username:username,password:md5(password)}).then(data=>{
        if (!data) {
            return res.json({
                code: '2002',
                msg: '账号或密码错误~~',
                data: null
            })
        } else {
            let token = jwt.sign({
                username: data.username,
                id: data._id
            },secret,{
                expiresIn: 60*60*24*7 // 过期时间
            })
            res.json({
                code: '0000',
                msg: '登录成功~~',
                data: token
            })
        }
    },err=>{
        res.json({
            code: '2001',
            msg: '数据库读取失败~~',
            data: null
        })
    })
})

router.post('/logout',(req,res,next)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功~~',url:'/login'})
    });
})

module.exports = router;
