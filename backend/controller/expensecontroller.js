const Expense = require('../model/expensemodel') ;
const User = require('../model/userdetail') ;
// const sequelize = require('../util/table') ;
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



const postFile = async (req, res, next) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        const userId = req.user.id;
        const stringifiedExp = JSON.stringify(expenses);
        const filename = `Expenses${userId}/${new Date()}.txt`;
        const fileURL = await uploadToS3(stringifiedExp, filename);
        console.log(fileURL + ' fileurl');
        return res.status(200).json({ fileURL, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ fileURL: null, success: false, message: 'Internal Server Error' });
    }
};

const postData = async (req, res, next) => {
    try {
        const { category, price, description } = req.body;
        console.log("category is"+category) ;
        console.log("price is"+price) ;
        console.log("desc is"+description)

        const userId = req.user.id;

        const data = await Expense.create({
            category : category,
            description : description,
            price : price,
            userId,
        });

        const user = await User.findById(userId);
        user.total_exp += price;
        await user.save();

        res.status(201).json({ newdata: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getData = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;

        const expenses = await Expense.find({ userId: req.user.id }).skip(skip).limit(limit);
console.log("expenses is"+expenses) ;
        res.status(200).json({ details: expenses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving expenses' });
    }
};

const userTotalData = async (req, res) => {
    try {
        const totalItems = await Expense.countDocuments({ userId: req.user.id });
        res.json({ totalExp: totalItems });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteData = async (req, res, next) => {
    try {
        const dataId = req.params.id;
        const expense = await Expense.findOne({ _id: dataId, userId: req.user.id });

        if (expense) {
            const total_exp = req.user.total_exp - expense.price;
            await expense.deleteOne({ _id : dataId})
            req.user.total_exp = total_exp;
            await req.user.save();
            
            return res.status(200).json({ delete: expense, message: 'Expense deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Expense not found for the user' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getData,
    deleteData,
    postData,
    postFile,
    userTotalData,
};



