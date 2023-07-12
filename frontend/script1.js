


// async function checkdetail() {
// try {
//     const response = await axios.get('http://localhost:3800/getdata') 
// for(let i=0 ;i<response.data.getdata.length ;i++) {
//    console.log(response.data.getdata[i].email) ;

//    if(response.data.getdata[i].email === email && response.data.getdata[i].password === password) {
//     alert("login succesfull")
  
//    }
//    else (alert("incorrect email"))
  
// }
// }
// catch(err) {
//     console.log(err) ;
// }
// }

const btn = document.getElementById('btn-primary') ;
const signupbtn = document.getElementById('signup') ;
btn.addEventListener('click' ,savelogindetail) ;
signupbtn.addEventListener('click' , signuppage) ;

async function savelogindetail(e) {
    e.preventDefault() ;
    const email = document.getElementById('email').value ;
const password = document.getElementById('password').value ;
    try {
 const logindetail = {
     email,
     password
 }
const response = await axios.post('http://localhost:3800/user/login',logindetail) ;
if(response.status==200) {
  
   
    localStorage.setItem('token' , response.data.token) ;
    localStorage.setItem('email' , email) ;
    // console.log("token store", response.data.token ) ;
    // console.log("premium" , getuser.data.ispremium) ;
     alert(response.data.messege) ;
     
    window.location.href = 'http://127.0.0.1:5501/frontend/expense.html' ;
}
else {
    throw new Error(response.data.messege) ;
}

    }
    catch(err) {
        console.log(err) ;
        alert(err.response.data.messege) ;
        
    }
}

async function signuppage(e) {
    e.preventDefault() ;
    window.location.href = 'http://127.0.0.1:5501/frontend/index.html'
}
const forgotbtn = document.getElementById('forgotpass') ;
  forgotbtn.addEventListener('click' , async(e)=>{
    console.log(forgotbtn) ;
    e.preventDefault() ;
    window.location.href = 'http://127.0.0.1:5501/frontend/forgotpass.html' ;
  })

