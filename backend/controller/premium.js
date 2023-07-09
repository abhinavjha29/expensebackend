const Razorpay = require('razorpay') ;
const order = require('../model/order') ;

exports.purchasepremium = async (req , res, next)=>{
try {
const rzp = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID ,
    key_secret : process.env.RAZORPAY_KEY_SECRET

})
const amount = 2500 ;
 rzp.orders.create({amount , currency: 'INR'}, (err , order))
 if(err) {
    throw new Error(JSON.stringify(err)) 
 }
 else {
    await req.user.createOrder({orderid : order.id , status : 'PENDING'})
    return res.status(201).json({order , key_id : rzp.key_id}) ;
 }
}
catch{
    console.log(err) ;
    return res.status(403).json({messege : 'something went wrong ' , error : err}) ;
}

}