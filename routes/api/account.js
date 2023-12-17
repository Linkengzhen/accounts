const express = require('express');
const CheckTokenMiddleWare = require("../../MiddleWares/CheckTokenMiddleWare");
const router = express.Router();
const AccountModel = require("../../models/AccountModel");
const moment = require("moment");

// const adapter = new FileSync(__dirname + '/../data/db.json')
// const db = low(adapter)
/* GET home page. */
router.get('/account',CheckTokenMiddleWare,(req,res,next)=>{
    console.log(req.user)
    // let count = db.get('accounts').value();
    AccountModel.find().sort({time:-1})
        .then((data,err)=>{
            if (err){
                // res.status(500).send('读取失败！！！')
                res.json({
                    code: '1001',
                    msg: '读取失败！！！',
                    data: null
                })
                return;
            }
            res.json({
                code: '0000',
                msg: '读取成功~~',
                data: data
            });
            // res.render('account',{account:data,moment:moment});
        })
});

router.post('/account',CheckTokenMiddleWare,(req,res,next)=>{
    AccountModel.create({
        ...req.body,
        time: moment(req.body.time).toDate()
    })
        .then((data,err)=>{
            if (err){
                // res.status(500).send('添加失败！！！')
                res.json({
                    code: '1002',
                    msg: '添加失败！！！',
                    data: null
                })
                return;
            }
            // res.render('success',{msg:'添加成功！！',url:'/account'});
            res.json({
                code: '0000',
                msg: '添加成功！！',
                data: data
            });
        });
})

router.delete('/account/:id',CheckTokenMiddleWare,(req,res,next)=>{
    let id = req.params.id;
    // db.get('accounts').remove({id:id}).write();
    AccountModel.deleteOne({_id:id}).then((data,err)=>{
        if (err){
            // res.status(500).send('删除失败！！！')
            res.json({
                code: '1003',
                msg: '删除失败！！！',
                data: null
            })
            return;
        }
        // res.render('success',{msg:'删除成功！！',url:'/account'})
        res.json({
            code: '0000',
            msg: '删除成功！！',
            data: {}
        })
    })
});

router.get('/account/:id', CheckTokenMiddleWare,(req, res) => {
        let {id} = req.params;
        AccountModel.findById(id).then((data,err) => {
            if (err){
                // res.status(500).send('读取失败！！！')
                res.json({
                    code: '1004',
                    msg: '读取失败！！！',
                    data: null
                })
                return;
            }
            res.json({
                code: '0000',
                msg: '读取成功~~',
                data: data
            });
        })
})

router.patch('/account/:id',CheckTokenMiddleWare, (req, res) =>{
    let {id} = req.params;
    AccountModel.updateOne({_id:id}, req.body).then((data, err) =>{
        if (err){
            // res.status(500).send('修改失败！！！')
            res.json({
                code: '1005',
                msg: '更新单个账单失败！！！',
                data: null
            })
            return;
        }
        AccountModel.findById(id).then((data,err)=>{
            if (err) {
                res.json({
                    code: '1004',
                    msg: '读取失败(更新单个账单)！！！',
                    data: null
                })
            }
            res.json({
                code: '0000',
                msg: '更新单个账单成功~~~',
                data: data
            })
        })
    })
})

module.exports = router;
