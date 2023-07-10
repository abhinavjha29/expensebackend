
function selectOption(option) {
    document.getElementById('myInput').value = option;
  }
  showdetails()
  
  function showdetails() {

  window.addEventListener("DOMContentLoaded", async () => {
    try {
      chekcpremium()
      const token =  localStorage.getItem('token') ;
console.log("Token:", token); 
//const tokendata = await axios.get("http://localhost:3800/login")
    //  token = tokendata.data.token ;
      const response = await axios.get("http://localhost:3800/expense/getexpense" , {headers : {"Authorization" : token} });
      
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
  try {
    e.preventDefault() ;
    const token = localStorage.getItem('token') ;
    console.log("check1")
    const response = await axios.get('http://localhost:3800/premium/premiummembership' , { headers : {"Authorization" : token}})
    console.log(response) ;
    const options = {
    "key" : response.data.key_id ,
    "order_id" : response.data.order.id ,
    "handler" : async function (response) {
    const resp =   await axios.post('http://localhost:3800/premium/updatestatus', {
        order_id : options.order_id , 
        payment_id : response.razorpay_payment_id , 
      } , { headers : {"Authorization" : token}} )
      if(resp) {
        alert("Your are a premium User") ;
        prembtn.remove() ;
        showpremium() ;
      }
      
    }
    }
    
    const rzpl = new Razorpay(options) ;
    rzpl.open() ;
    e.preventDefault() ;
    rzpl.on('payment failed' , function (response){
      console.log(response) ;
      alert("something went wrong") ;
    })
    }
    catch (err) {
      console.log(err) ;
    }
  }

  async function showpremium() {
    const premdiv = document.getElementById('premiumdiv') 
    const li = document.createElement('li') ;
    li.appendChild(document.createTextNode("You are a premium User"))
    premdiv.appendChild(li) ;
  }

  async function chekcpremium() {
    try {
      const token = localStorage.getItem('token') ;
      const email = localStorage.getItem('email')
      console.log("checkpremium")
      const user = await axios.get('http://localhost:3800/user/get' , { headers : {"Authorization" : token}}) ;
      for(let i =0 ;i<user.data.getdata.length ; i++) {
        console.log("user is"+JSON.stringify(user.data.getdata[i].email))
        if(user.data.getdata[i].email==email) {
          console.log("prem is "+JSON.stringify(user.data.getdata[i].ispremium))
          if(user.data.getdata[i].ispremium==true) {
            prembtn.remove() ;
        showpremium() ;
        showleaderboard() ;
          }
        }
      }
      
    }
    catch(err) {
      console.log(err) ;
    }
   
  }

  async function showleaderboard() {
const token = localStorage.getItem('token') ;
    const leaderboardbtn = document.createElement('input') ;
    leaderboardbtn.type = 'Button' ;
    leaderboardbtn.value = 'Show LeaderBoard' ;
    const premdiv = document.getElementById('premiumdiv') 
    premdiv.appendChild(leaderboardbtn) ;

    leaderboardbtn.addEventListener('click' , async (e)=>{
      try {
        e.preventDefault() ;
        const res = await axios.get('http://localhost:3800/premfeature/leaderboard' ,{ headers : {"Authorization" : token}} )
        const li = document.createElement('li') ;
        const premdiv = document.getElementById('premiumdiv') 
        li.className = 'list-group-item'
        const ul = document.createElement('ul') ;

        console.log(res.data) ;
        res.data.user_det.forEach(detail => {
          li.appendChild(document.createTextNode("name==> "+detail.name+" expense is ==> "+detail.total_expense))
          premdiv.appendChild(li) ; ;
        });
      } 
      catch (err) {
        console.log(err) ;
      }
    }
    
    )
  

  }

