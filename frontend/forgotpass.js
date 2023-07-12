

const forgotbtn = document.getElementById('forgotbtn') ;
forgotbtn.addEventListener('click' , postmail) ;
async function postmail(e) {
    try {
        e.preventDefault() ;
        const email = document.getElementById('email').value ;
        console.log(1) ;
        const detail = {
            email : email
        }

        const res =  await axios.post('http://localhost:3800/password/forgotpassword' , detail) ;
        console.log("succes") ;
        
        if(res.status==200) {
            alert(res.data.message)
        }
        else {
            console.log(res.data.message)
            alert(res.data.message) ;
        }
    }
    catch(err) {
        if(err.response) {
            alert(err.response.data.message) ;
            console.log(err) ;
        }
        else alert('error')
      
        
    }
}