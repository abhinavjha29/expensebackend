
let c = 0 ;
let cc= 1 ;
const pag = document.getElementById('pagination') ;


function selectOption(option) {
  document.getElementById('myInput').value = option;
}
//showdetails()
window.addEventListener('DOMContentLoaded', showdetails)
async function showdetails() {
  
totalcount() ;

  try {
    
   await chekcpremium()
    const token =  localStorage.getItem('token') ;

// const objurlparams = new URLSearchParams(window.location.search) ;
//console.log(objurlparams+"params is ")
const page =  0 ;
const limit = 3 ;
   const response = await axios.get(`http://localhost:3800/expense/getexpense` , {headers : {"Authorization" : token} ,
  params : {
    page : page ,
    limit : limit 
  }
  });
    
    
    for (let i = 0; i < response.data.details.length; i++) {
      showexpensedetail(response.data.details[i]);
      
    }
//     const paginationData = {
//       currentPage: response.data.currentPage,
//       hasnextpage: response.data.hasnextpage,
//       nextpage: response.data.nextpage,
//       haspreviouspage: response.data.haspreviouspage,
//       previouspage: response.data.previouspage,
//       lastpage: response.data.lastpage
//     };
//     showpagination(paginationData) ;
  } catch (error) {
    console.log(error);
  }

}


let btn = document.getElementById('btn') ;
btn.addEventListener('click' , savedata) ;

async  function savedata(e) {
try {
  let category = document.getElementById('myInput').value ;

  let description = document.getElementById('Description').value ;
  let price = document.getElementById('price').value ;
  const token =  localStorage.getItem('token') ;
  
  
  let user_data = {
    category ,
    description ,
    price,
  
  }
  const result =  axios.post('http://localhost:3800/expense/postexpense' , user_data, {headers : {"Authorization" : token} })
  
    console.log("succesfully posted") ;
    showdetails() ;
    
  
  
}
catch(err) {
  console.log(err) ;
}

}



async function showexpensedetail(details) {
  try {
    
    
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
   // li.id = details.id ;
  
    const contentWrapper = document.createElement('div');
    const category = document.createElement('span');
    category.className = 'fw-bold';
    category.appendChild(document.createTextNode('Category: ' + details.category));
    contentWrapper.appendChild(category);
  
    const description = document.createElement('p');
    description.className = 'mb-0';
    description.appendChild(document.createTextNode('Description: ' + details.description));
    contentWrapper.appendChild(description);
  
    const amount = document.createElement('span');
    amount.className = 'fw-bold';
    amount.appendChild(document.createTextNode('Amount: ' + details.price));
    contentWrapper.appendChild(amount);
  
    li.appendChild(contentWrapper);
  
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm del-btn';
    deleteBtn.id = details.id;
    deleteBtn.appendChild(document.createTextNode('Delete'));
  
    li.appendChild(deleteBtn);
  
    item.appendChild(li);
  
  
  let del = document.getElementById(deleteBtn.id) ;
  console.log(del) ;
  
  del.addEventListener('click' , async(e)=>{
    //e.preventDefault() ;
    if(e.target.classList.contains('del-btn')) {
      try {
        console.log(document.getElementsByClassName("btn btn-danger btn-sm"))
        const token =  localStorage.getItem('token') ;
  const res = await axios.delete(`http://localhost:3800/expense/deleteexpense/${e.target.id}` , {headers : {"Authorization" : token} }) 
  if (res.status==200) {
    console.log('deleted succesfully')
   li.remove() ; 
  showleaderboard() ;
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
  catch(err) {
    console.log(err) ;
  }

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
      await showpremium() ;
      prembtn.remove() ;
     
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
  leaderboardbtn.id = 'leaderboardbtn' ;
  leaderboardbtn.type = 'Button' ;
  leaderboardbtn.value = 'Show LeaderBoard' ;
  const premdiv = document.getElementById('premiumdiv') 
  premdiv.appendChild(leaderboardbtn) ;

  // leaderboardbtn.addEventListener('click' , async (e)=>{
  //   try {
  //     e.preventDefault() ;
  //     const res = await axios.get('http://localhost:3800/premfeature/leaderboard' ,{ headers : {"Authorization" : token}} )
      
  //     const premdiv = document.getElementById('premiumdiv') 
     
      

  //     console.log(res.data) ;
  //     res.data.user_det.forEach(detail => {
  //       const li = document.createElement('li') ; 
  //       li.appendChild(document.createTextNode("name==> "+detail.name+" expense is ==> "+detail.total_exp))
      
  //       premdiv.appendChild(li) ; ;
  //     });
  //   } 
  //   catch (err) {
  //     console.log(err) ;
  //   }
  // }
  
  // )
  leaderboardbtn.addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get('http://localhost:3800/premfeature/leaderboard', { headers: {"Authorization": token}});
  
      const premdiv = document.getElementById('premiumdiv');
      const table = document.createElement('table');
      table.classList.add('table', 'table-bordered');
  
      const thead = document.createElement('thead');
      const trHead = document.createElement('tr');
  
      const thName = document.createElement('th');
      thName.scope = 'col';
      thName.appendChild(document.createTextNode('Name'));
  
      const thExpense = document.createElement('th');
      thExpense.scope = 'col';
      thExpense.appendChild(document.createTextNode('Expense'));
  
      trHead.appendChild(thName);
      trHead.appendChild(thExpense);
      thead.appendChild(trHead);
      table.appendChild(thead);
  
      const tbody = document.createElement('tbody');
      res.data.user_det.forEach(detail => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.appendChild(document.createTextNode(detail.name));
  
        const tdExpense = document.createElement('td');
        tdExpense.appendChild(document.createTextNode(detail.total_exp));
  
        tr.appendChild(tdName);
        tr.appendChild(tdExpense);
        tbody.appendChild(tr);
      });
  
      table.appendChild(tbody);
      premdiv.appendChild(table);
      const leaderbtn = document.getElementById('leaderboardbtn') ;
      leaderboardbtn.remove() ;
      
    } catch (err) {
      console.log(err);
    }
  });
  
}
const filebtn = document.getElementById('file') ;
filebtn.addEventListener('click' , downloadFile)

async function downloadFile(e) {
try {
  e.preventDefault() ;
const token = localStorage.getItem('token') ;
const response = await axios.get('http://localhost:3800/expense/download' , { headers: {"Authorization": token}})
if (response.status==200) {
console.log(response) ;
const a = document.createElement('a') ;
a.href = response.data.fileURL ;
a.download = 'myexpense.csv' ;
a.click()
}
else {
console.log(err) ;
throw new Error(response.data.messege)
}

}
catch(err) {
  console.log(err) ;
}


}



// async function showpagination( {
// currentPage ,
// hasnextpage ,
// nextpage ,
// haspreviouspage ,
// previouspage ,
// lastpage}) {
  

//   pagination.innerHTML = "" ;

  
//   if(haspreviouspage) {
//     const btn2 = document.createElement('button') ;
//     btn2.innerHTML = previouspage ;
//     btn2.addEventListener('click' , ()=>showdetails(previouspage))
//     pagination.appendChild(btn2) ;
//   }
//   const btn1 = document.createElement('button') ;
//   btn1.innerHTML = `<h3>${currentPage}</h3>`
//   btn1.addEventListener('click' , ()=>showdetails(currentPage))
//   pagination.appendChild(btn1) ;

//   if(hasnextpage) {
//     const btn3 = document.createElement('button') ;
//     btn3.innerHTML = nextpage ;
//     btn3.addEventListener('click' , ()=>{ 
//       console.log(nextpage)
//       showdetails(nextpage)})
//     pagination.appendChild(btn3) ;
//   }
// }

async function totalcount() {
  let token = localStorage.getItem("token");
  axios
    .get(`http://localhost:3800/expense/gettotal`, {
      headers: { authorization: token },
    })
    .then((result) => {
      let k = 3;
console.log( "result is "+JSON.stringify(result.data)) ;

      let j = Math.trunc((result.data.totalexp / k) + 1);
      console.log(k);

      for (let i = 0; i < j; i++) {
        pag.innerHTML += `<button class="allbtns" id="page=${c++}&limit=${k}">${cc++}</button> `;
      }
    });
}

pag.addEventListener('click' , async(e)=>{
  console.log(e.target.id) ;
if(e.target.id) {
 const token = localStorage.getItem('token') ;
 const response = await axios.get(`http://localhost:3800/expense/getexpense?${e.target.id}` , {headers : {"Authorization" : token} }); 
 for (let i = 0; i < response.data.details.length; i++) {
  showexpensedetail(response.data.details[i]);
  
}
}
})


