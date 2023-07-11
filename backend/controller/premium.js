const Razorpay = require('razorpay') ;
const Order = require('../model/order') ;

 const  purchasepremium = async (req , res, next)=>{
try {
   
const rzp = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID , 
    key_secret : process.env.RAZORPAY_KEY_SECRET ,  

})
const amount = 2500 ;
  rzp.orders.create({amount , currency: 'INR'}, (err , order)=>{
    if(err) {
        console.log(err) ;
        
     }
     else {
        console.log("RAZARPAY ORDER IS "+order)
         req.user.createOrder({orderid : order.id , status : 'PENDING'})
        return res.status(201).json({order , key_id : rzp.key_id}) ;
     }
 })
 
}
catch(err) {

    console.log(err) ;
    return res.status(403).json({messege : 'something went wrong ' , error : err}) ;
}

}

const updatestatus = async (req , res , next)=>{
try {
const { payment_id , order_id} = req.body ;
const order = await Order.findOne({where : {orderid : order_id}})
console.log(order) ;
await order.update({paymentid : payment_id , status :'SUCCESFULL'}) 
await req.user.update({ispremium : true})

return res.status(202).json({sucess : true , messege : "Transcition Succesfull"})
}
catch (err) {
console.log(err) ;
return res.status(404) ;
}
}

module.exports = {
    purchasepremium , updatestatus
}