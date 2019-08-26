const { transaction } = require('../models')
class transaction_controller {
    static getTransaction (req,res){
        transaction.find().populate('User').populate('ProductList.Product')
        .then(data=>{
            console.log(req.decode.data.email , ' ini pentinG!!!!!!!!!!!!!!!!!!');
            // console.log(data)
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static konfirmasiTrx (req,res){
        transaction.updateOne({
            _id : req.params.id
        },{
            status : 'second'
        })
        .then(data=>{``
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static konfirmasiUser (req,res){
        transaction.updateOne({
            _id : req.params.id
        },{
            status : 'third'
        })
        .then(data=>{``
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static getTrxUser (req,res){
        transaction.find({
            User : req.decode.data._id
        })
        .then(data=>{
            console.log(data , ' ini penting juga YA !!!!')
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static getOneTrx (req,res){
        transaction.findOne({
            _id : req.params.id
        }).populate('User').populate('ProductList.Product')
        .then(data=>{
            console.log(data , ' ini penting juga YA !!!! / =-=-=-=2-3=2302=302=032=032=302=30=')
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = transaction_controller