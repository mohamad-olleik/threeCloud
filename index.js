async function createStudent(){
    const name=document.getElementById('name').value;
    const age=document.getElementById('age').value;
    const city=document.getElementById('city').value;
    console.log(name)


    const response = await fetch('https://threecloud.onrender.com/student', {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the server expects JSON
          "Authorization": "Bearer your-token" // Optional: Add if required by the API
        },
        body: JSON.stringify({name,age,city}) // Convert JavaScript const to JSON string
      });
      
      if(response.ok){
        alert('student created succesfully')
      }
      else{
        alert('failed to add student')
      }
      
}

async function getAllStudents(){
  const table=document.getElementById('table');

  const response=await fetch('https://threecloud.onrender.com/student',{
    method:'GET',
    headers:{
      "Content-Type": "application/json", // Ensure the server expects JSON
          "Authorization": "Bearer your-token" 
    }
  })
  // .then(data=>{
  //   data.forEach(element => {
  //     const row=document.createElement('tr');
  //     row.innerHTML=
      
  //   });
  // })
  if(response.ok){
    table.innerHTML='';
    let data=await response.json();
    data.forEach(element => {
      let row=document.createElement('tr');
      row.innerHTML=`
      <td>${element._id}</td>
      <td>${element.name}</td>
      <td>${element.age}</td>
      <td>${element.city}</td>

      `
      table.appendChild(row)
      

      
    });
    alert('students found succesfully');
  }
  else{
    alert('failed to retrieve students')
  }
  
  
}

async function getSingleStudent(){

  const id=document.getElementById('singleID').value;
  const table=document.getElementById('singleStudentInfo');
  
  

  // Check if the id is empty
  if (!id) {
      console.error("Error: ID is not provided!");
      alert("Please enter a valid ID.");
      return; // Stop execution if ID is empty
  }
  


  const response=await fetch(`https://threecloud.onrender.com/getSingleStudent?id=${id}`,{
    method:'GET',
    headers:{
      "Content-Type": "application/json", // Ensure the server expects JSON
      "Authorization": "Bearer your-token" 
    }
    
   })
  //  .then(data=>{
  //   console.log(response)
    
  //  })
   if(response.ok){
    table.innerHTML='';

    let data=await response.json();
    
      console.log(data)
    
    let row=document.createElement('tr');
    row.innerHTML=`
    <td>${data._id}</td>
    <td>${data.name}</td>
    <td>${data.age}</td>
    <td>${data.city}</td>
    `
    table.appendChild(row);
    alert('single student found succesfully')
   }
  else{
    alert('failed to find single student info')
  }



}

async function deleteStudent() {
  let deletedid = document.getElementById('deletedID').value.trim();
  if (!deletedid) {
      alert("Please enter a valid ID");
      return;
  }

  const response = await fetch(`https://threecloud.onrender.com/student?id=${encodeURIComponent(deletedid)}`, {
      method: 'DELETE',
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer your-token"
      }
      
  });

  if (response.ok) {
      alert('Student with such ID is deleted successfully');
  } else {
      alert('Failed to delete student with such ID');
  }
}


async function updateStudent(){
  let id=document.getElementById('updatedID').value;
  let newAge=document.getElementById('newAge').value;
  let queryParameters=`?id=${encodeURIComponent(id)}&age=${encodeURIComponent(newAge)}`

   const response=await fetch(`https://threecloud.onrender.com/updateStudent${queryParameters}`,{
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer your-token"
    },
    
    
  })
  

  if(response.ok){
    alert('student age updated succesfully')
  }
  else{
    alert('failed to update student age')
  }
  
  
 
  
  // alert(id)
  
}

