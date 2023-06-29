
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
        await axios.post('http://localhost:3800/save' , user_detail)
        console.log("posted succesfully") ; 
        
    }
    catch(err) {
        console.log(err) ;
    }

} 
const btn = document.getElementById('btn-primary') ;
btn.addEventListener('click' ,saveuserdetail) ;