
function selectOption(option) {
    document.getElementById('myInput').value = option;
  }
  showdetails()
function showdetails() {

  window.addEventListener("DOMContentLoaded", async () => {
    try {
      const token =  localStorage.getItem('token') ;
console.log("Token:", token); 
//const tokendata = await axios.get("http://localhost:3800/login")
    //  token = tokendata.data.token ;
      const response = await axios.get("http://localhost:3800/expense/getexpense" , {headers : {"Authorization" : token} });
      console.log("hello")
      for (let i = 0; i < response.data.details.length; i++) {
        showexpensedetail(response.data.details[i]);
      
      }

    } catch (error) {
      console.log(error);
    }
  });
}
  

  let btn = document.getElementById('btn') ;
  btn.addEventListener('click' , savedata) ;

  function savedata(e) {
let category = document.getElementById('myInput').value ;

let description = document.getElementById('Description').value ;
let price = document.getElementById('price').value ;
const token =  localStorage.getItem('token') ;


let user_data = {
  category ,
  description ,
  price,

}
axios.post('http://localhost:3800/expense/postexpense' , user_data, {headers : {"Authorization" : token} })
.then(result=>{
  console.log("succesfully posted") ;
  showdetails() ;
  
})
.catch(err=>console.log(err))
  }

 

  function showexpensedetail(details) {
    //let items = document.getElementById('item') ;
   
    const li = document.createElement('li') ;
    li.className = 'list-group-item' ;
    li.appendChild(document.createTextNode("category->"+details.category+ "--desc ->"+details.description +"-- amount ->"+details.price))
    item.appendChild(li) ;
//console.log(details.id) ;
    //delet btn 
    const deletebtn = document.createElement('button') ;
    deletebtn.style.background = "red" ;
deletebtn.className = 'list-del-btn' ;
deletebtn.id = details.id ;
deletebtn.appendChild(document.createTextNode("DEL")) ;

li.appendChild(deletebtn) ;
//item.appendChild(li) ;

let del = document.getElementById(deletebtn.id) ;

del.addEventListener('click' , async(e)=>{
  //e.preventDefault() ;
  if(e.target.classList.contains('list-del-btn')) {
    try {
      const token =  localStorage.getItem('token') ;
const res = await axios.delete(`http://localhost:3800/expense/deleteexpense/${e.target.id}` , {headers : {"Authorization" : token} }) 
if (res.status==200) {
  console.log('deleted succesfully')
  li.remove() ;
}
else {
  alert(res.data.messege)
}

    }
    catch(err) {
      console.log(err) ;
    }
  }
})
  }

  let prembtn = document.getElementById('premium') ;

prembtn.addEventListener('click' , premiummembership) ;

async function  premiummembership(e) {
e.preventDefault() ;
const token = localStorage.getItem('token') ;
const response = await axios.get('http://localhost/3800/premium/premmembership' , { headers : {"Authorization" : token}})
console.log(response) ;
const options = {
"key" : response.data.key_id ,
"orderid" : response.data.order.id ,
"handler" : async function (response) {
  await axios.post('/', {
    order_id : options.order_id , 
    payment_id : response.razorpay_payment_id , 
  } , { headers : {"Authorization" : token}} ) 
  alert("Your are a premium User")
}
}

const rzpl = new RazorPay(options) ;
rzpl.open() ;
e.preventDefault() ;
rzpl.on('payment failed' , function (response){
  console.log(response) ;
  alert("something went wrong") ;
})
}