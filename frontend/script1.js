


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
btn.addEventListener('click' ,savelogindetail) ;

async function savelogindetail(e) {
    e.preventDefault() ;
    const email = document.getElementById('email').value ;
const password = document.getElementById('password').value ;
    try {
 const logindetail = {
     email,
     password
 }
const response = await axios.post('http://localhost:3800/login',logindetail) ;
if(response.status==200) {
   alert(response.data.messege) ;
    window.location.href = "http://127.0.0.1:5500/frontend/" ;
}
else {
    throw new Error(response.data.messege) ;
}

    }
    catch(err) {
        alert(err.response.data.messege) ;
        console.log(err) ;
    }
}