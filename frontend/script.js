
 async function saveuserdetail()  {
    try {
        const name = document.getElementById('name').value ;
        const email = document.getElementById('email').value ;
        const password = document.getElementById('password').value ;
        const user_detail = {
            name , 
            email ,
            password
        } ;
        await axios.post('http://localhost:3800/user/save' , user_detail)
        console.log("posted succesfully") ; 
        window.location.href= 'http://127.0.0.1:5501/frontend/login.html'
        
    }
    catch(err) {
        console.log(err) ;
    }

} 
const btn = document.getElementById('btn-primary') ;
btn.addEventListener('click' ,saveuserdetail) ;

async function gotologin(e) {
e.preventDefault() ;
window.location.href = 'http://127.0.0.1:5501/frontend/login.html'

}
const loginbtn = document.getElementById('loginpage') ; 
loginbtn.addEventListener('click' , gotologin)