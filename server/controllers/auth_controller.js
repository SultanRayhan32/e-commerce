const { User } = require('../models')
const { Token ,  ComparePassword } = require('../helpers')
class AuthController {
    static Register (req,res,next){
        // console.log(username , password , email , ' dsisininisnifnds sjfbdshfdbsnf')
        let { username ,  password , email } = req.body
        // res.send(HashingPassword(password))
        User.create({
            username ,  password ,  email
        })
        .then(user=>{
            res.status(201).json({
                token : Token(user),
                user , 
                message : 'sukses add data'
            })
        })
        .catch(err=>{next(err)})
    }

    static Login(req,res,next){
        let {  email , password } = req.body
        // console.log('sukses login')
        let kondisi = false
        User.findOne({
            email 
        })
        .then(user=>{
            if(user){
                if(ComparePassword(user.password , password)){
                    kondisi = true
                    // console.log(user)
                    // console.log(Token(user))
                    if(user.email == 'master@mail.com'){
                        res.status(201).json({
                            token : Token(user) , admin : true
                        })    
                    }else {
                        res.status(201).json({
                            token : Token(user) 
                        })
                    }
                }else {
                    console.log('here ,  345')
                    res.status(403).json({
                        message : 'Email or Password NOT FOUND!!!!!'
                    })
                }
            }else {
                console.log('here ,123')
                res.status(403).json({
                    message : 'Email or Password NOT FOUND!!!!!'
                })
            }
        })
        .catch(err=>{
            console.log('gagal login')
            next(err)
        })
    }

    static RegisterGoogle(req,res,next){
        let data;
        let kondisi = true
        const client = new OAuth2Client("438390530813-hqkaes7ruh8js6eoc2r6cleest6jgqrh.apps.googleusercontent.com");
        client.verifyIdToken({
            idToken : req.body.id_token ,
            audience :  "438390530813-hqkaes7ruh8js6eoc2r6cleest6jgqrh.apps.googleusercontent.com"
        })
        .then(ticket=>{
            data = ticket.payload
            return User.findOne({
                email : data.email
            })
        })
        .then(user=>{
            if(user){
                kondisi = false
                let tokenUser = Token(user._id)
                // console.log(tokenUser)
                console.log(user.name , ' fdlskfjkdlsjfkdsljfkdlsjfdsklfjdslkfjdslkfjdsklfjkljlkj')
                res.json({
                    token : tokenUser,
                    name : user.name
                })
            }else {
                let { name , email } = data
                console.log(data , ' ini yg penting')
                return User.create({
                    name , email , password : 'asal'
                })
            }
        })
        .then(data2=>{
            if(kondisi){
                // console.log('dsmfdksmf')
                console.log(Token(data2) , ' di register biasa google')
                res.status(201).json({
                    token : Token(data2),
                    data2,
                    message : 'sukses add data'
                })
            }
        })
        .catch(err=>{
            next(err)    
        })
    }
}

module.exports = AuthController