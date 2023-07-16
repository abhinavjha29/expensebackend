const Expense = require('../model/expensemodel') ;
const User = require('../model/userdetail') ;
const sequelize = require('../util/table') ;
const AWS = require('aws-sdk') ;

 async function  uploadtos3(data , filename) {
const BUCKET_NAME = process.env.BUCKET_NAME
const IAM_USER_KEY =process.env.IAM_USER_KEY
const IAM_SECRET_KEY =process.env.IAM_SECRET_KEY 

let s3bucket = new AWS.S3({
    accessKeyId : IAM_USER_KEY ,
    secretAccessKey : IAM_SECRET_KEY ,

})

    let params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data ,
        ACL : 'public-read'
    } 
    return new Promise ((resolve , reject)=>{
        s3bucket.upload(params , (err , s3res)=>{
            if(err) {
                console.log("something wromng" , err)
          reject(err) ;
            }
            else {
                console.log("succes=>  " , s3res) ;
                resolve (s3res.Location) ;
            }
    
        })
        
    })
    


}

const postFile = async (req , res , next)=> {
try {
    
const expenses = await  Expense.findAll({where : {userId : req.user.id}}) ;
const userId = req.user.id ;
 const stringifiedexp = JSON.stringify(expenses)
  const filename = `Expenses${userId}/${new Date()}.txt` ;
  const fileURL = await uploadtos3(stringifiedexp , filename) ;
  console.log(fileURL+ "fileurl") ;
  return res.status(200).json({fileURL , success : "true"}) ;
}
catch(err) {
    res.status(500).json({fileURL : null , success : "false" , messege : "ERROR 500"})
    console.log(err) ;
}
}

const postData = async (req , res , next)=>{
    try {
        const t = await sequelize.transaction() ;
        const category = req.body.category ;
        const price = req.body.price ;
        const description = req.body.description ;
        const userId = req.user.id ;
    
       
        const data = await Expense.create({
            category : category ,
            description : description ,
            price : price ,
            userId : userId
           
        } , {transaction : t})
        const total_exp = Number(req.user.total_exp) + Number(price) ;
        await User.update({
            total_exp : total_exp  }
            , {
                where : {id : req.user.id}  ,
                transaction : t
            }
            ) 
            await t.commit() ;
      return  res.status(201).json({newdata : data})
        
    }
catch(error) {
    await t.rollback() ;
    console.log(error) ;
}
}

 const getData = async (req , res , next)=>{
    try { 
        console.log(req.query) ;
       const page = Number(req.query.page); // Current page number
        
       const limit =  3; // Number of expenses per page
       
        console.log(page)
   
        const offset = (page) * limit;
        
        const expenses = await Expense.findAll({where : {userId : req.user.id} ,
        offset ,
        limit 
        }) ;
        
    //const lastpage = Math.ceil(totalitems / limit);
      
      res.status(200).json({details : expenses })
      
    console.log(req.query.page) ;
    }
    catch(err) {
        console.log(err) ;
        return res.status(500).json({messege : "Error retriving expense"})
        //alert("error showing data")
    }
}

const usertotaldata = async(req , res )=>{
    const totalitems = await Expense.count({where : {userId : req.user.id}})
res.json({totalexp : totalitems})
}

const deletedata = async(req , res ,next)=>{
    try {
        const t = await sequelize.transaction() ;
const data_id = req.params.id ;
console.log(req.user.id) ;
const resp = await Expense.findAll({where : {userId : req.user.id}}) 

if(resp) 
{

    const result = await Expense.findByPk(data_id , {transaction : t}) ;
    console.log(result.price) ;
    const total_exp = Number(req.user.total_exp) - Number(result.price) ;
    await result.destroy({transaction: t})
   
    await User.update({
        total_exp : total_exp  }
        , {
            where : {id : req.user.id}  ,
            transaction : t
        }
        )
        await t.commit() ; 
    return res.status(200).json({delete:result , messege : "expense deleted succesfylly"}) ;
}
else return res.status(404).json({
    messege: "user not found"
})
.catch(err=>{
    console.log(err) ;
    t.rollback()
})
 
    }
    catch(err) {
        //t.rollback() ;
        console.log(err) ;
    }
}

module.exports = {
 getData , deletedata 
 , postData , postFile
, usertotaldata
}