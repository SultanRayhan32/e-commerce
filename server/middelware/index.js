const jwt = require('jsonwebtoken');
const { TokenVerify} = require('../helpers')
// const { Todo } = require('../Models')
const { User ,  transaction } = require('../models')
module.exports = {
    VerifyToken : (token)=>{
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            console.log(decoded , ' di middelware')
            req.decoded = decoded
          } catch(err) {
            // err
          }
    },
    Authenthication : (req,res,next)=>{
        try {
         
          console.log(req.headers , ' =========================')
          console.log(req.headers.token , ' ./././././././')
          const decoded = TokenVerify(req.headers.token)
          req.decode = decoded;
          console.log(req.decode);
          // req.decode.data._id = 
          // console.log(req.decode , ' ---------------------------<><><><><> di middelware auth ccccccccccccc')
          next()
        }catch (err){
          res.status(403).json({
            message : "anda tidak memilik akses"
          })
        }
    }
    ,
    AuthorizedAdmin : (req,res,next)=>{
      if(req.decode.data.email != 'master@mail.com'){
        res.status(403).json({
          message : "Maaf Anda Bukan Admin !!!"
        })
      }
      else {  
        next()
      }
    },
    AuthorizedUser : (req,res,next) =>{
      transaction.findOne({
        _id : req.params.id,
        User : req.decode.data._id
      })
      .then(data=>{
        if(data || req.decode.data.email == 'master@mail.com'){
          next()
        }else{
          res.status(403).json({
            message : "anda tidak memilik akses"
          })
        }
      })
      .catch(err=>{
        console.log(err)
        res.status(500).json({
          message : 'INTERNAL SERVE ERROR'
        })
      })
    }
    // Authorized : (req,res,next)=>{
    //   User.findOne({
    //     _id : req.params.id
    //   })
    //   .then(user=>{
    //     console.log(' sampai di authorized middelware' , user , '<<<<<===========')
    //     if(user){
    //       next()
    //     }else {
    //       res.status(403).json({
    //         message : "You don't have access"
    //       })
    //     }
    //   })
    //   .catch(err=>{
    //     next(err)
    //   })
    // }
}