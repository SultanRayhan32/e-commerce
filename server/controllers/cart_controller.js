const { User , product , transaction} = require('../models')
const { ObjectId } = require('mongodb')
class cart_controller {
    static addCart(req,res){
        product.findById(req.body.id)
        .then(productItem=>{
            if(req.body.qty > productItem.stock ){
                res.status(300).json({
                    message : 'Stock Sudah Habis'
                })
            }else{
                product.updateOne({
                    _id : req.body.id
                },{
                    stock : productItem.stock - req.body.qty
                })
                .then(respons=>{
                    return  User.findOne({
                        _id : req.decode.data._id
                    })
                })
               .then(data=>{
                    let temp = data.cartList
                    let kondisi = false
                    temp = data.cartList.map(el=>{
                        if(el.Product._id == req.body.id){
                            el.quantity += req.body.qty
                            kondisi = true
                        }
                        return el
                    })
                    if(!kondisi){
                        temp.push({
                            Product : ObjectId(req.body.id),
                            quantity : req.body.qty
                        })
                    }
                    return User.updateOne({
                        _id : req.decode.data._id
                    },{
                        cartList : temp
                    })
                })
                .then(data=>{
                    console.log(data)
                    res.json(data)
                })
                .catch(err=>{
                    res.status(500).json({
                        message : 'error'
                    })
                    console.log(err , '=======================  ')
                })
            }
        })
        .catch(err=>{
            console.log(err , ' ==================')
        })
        console.log(req.body , ' ini body ================,.,.,.,.,.,.')
        
    }

    static getCart (req,res){
        User.findById(req.decode.data._id).populate('cartList.Product')
        .then(data=>{
            // console.log(data.cartList)
            console.log(data)
            res.json(data)
        })
        .catch( err =>{
            res.status(500).json({
                message : 'error'
            })
            console.log(err.json)
        })
    }

    static deleteCart (req,res){
        let temp = []
        let qtyBaru;
        let tempId;
        User.findById(req.decode.data._id).populate('cartList.Product')
        .then(data =>{
            console.log(data.cartList , ' resultsss')
            tempId = req.params.id
            data.cartList.forEach(el=>{
                if(el.Product._id == req.params.id){
                    qtyBaru = el.quantity +  el.Product.stock
                }
                else {
                    temp.push(el)
                }
            })
            // temp = data.cartList.filter( el => el.Product._id != req.params.id )
            console.log(JSON.stringify(temp , null , 2) , ' =-=-=-=0000 ini result')
            console.log(qtyBaru , ' ini qty baru yappppppp!!!')
            
            console.log(req.params)
            return User.updateOne({
                _id : req.decode.data._id
            },{
              cartList : temp  
            })
        })
        .then(data2=>{
            return product.updateOne({
                _id : tempId
            },{
                stock : qtyBaru
            })
        })
        .then(data3=>{
            console.log('berhasil')
            res.json(data3)
        })
        .catch( err =>{
            res.status(500).json({
                message : 'error'
            })
            console.log(err.json)
        })
    }

    static CheckOut(req,res){
       let productList = []
       let UserProfile;
       console.log(req.body)
       console.log(req.decode.data._id)
       User.findById(req.decode.data._id).populate('cartList.Product')
       .then(data1=>{
            productList = data1.cartList
            data1.cartList = []
            UserProfile = data1
            return transaction.create({
                ProductList : productList,
                User : UserProfile,
                totalHarga : req.body.totalHarga,
                alamat : req.body.alamat,
                status : 'first'
            })
            // console.log(data1)
            // console.log(productList , ' ini product list =======')
            // console.log(UserProfile , ' ini User Profile')
       })
       .then(data2=>{
           console.log(data2, ' berhasil add ke transaction' )
           return User.updateOne({
               _id : req.decode.data._id
           },{
               cartList : []
           })
       })
       .then(data3=>{
            res.json({
                message : 'sukses masuk ke transaksi'
            })
       }) 
       .catch(err=>{
           console.log(err)
       })
    }
}

module.exports = cart_controller