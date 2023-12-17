const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const AccountModel = require("../../models/AccountModel");
const moment = require("moment");
 
// const adapter = new FileSync(__dirname + '/../data/db.json')
// const db = low(adapter)
/* GET home page. */
const CheckLoginMiddleware = require('../../MiddleWares/CheckLoginMiddleWare.js')

router.get('/', (req, res, next) => {
  return res.redirect('/account');
})

router.get('/account', CheckLoginMiddleware, (req,res,next)=>{
  // let count = db.get('accounts').value();
  AccountModel.find().sort({time:-1})
      .then((data,err)=>{
        if (err){
          res.status(500).send('读取失败！！！')
          return;
        }
        res.render('account',{account:data,moment:moment});
      })
});

router.get('/account/create', CheckLoginMiddleware,(req,res,next)=>{
  res.render('create');
});

router.post('/account', CheckLoginMiddleware,(req,res,next)=>{
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  })
      .then((data,err)=>{
        if (err){
          res.status(500).send('添加失败！！！')
          return;
        }
        res.render('success',{msg:'添加成功！！',url:'/account'});
  });
})

router.get('/account/:id', CheckLoginMiddleware,(req,res,next)=>{
  let id = req.params.id;
  // db.get('accounts').remove({id:id}).write();
  AccountModel.deleteOne({_id:id}).then((data,err)=>{
      if (err){
        res.status(500).send('删除失败！！！')
        return;
      }
      res.render('success',{msg:'删除成功！！',url:'/account'})
  })
});

module.exports = router;
