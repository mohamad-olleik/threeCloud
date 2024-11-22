async function createStudent(){
    const name=document.getElementById('name').value;
    const age=document.getElementById('age').value;
    const city=document.getElementById('city').value;


    const response = await fetch(' https://threecloudsol.onrender.com/student', {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the server expects JSON
          "Authorization": "Bearer your-token" // Optional: Add if required by the API
        },
        body: JSON.stringify(name,age,city) // Convert JavaScript const to JSON string
      });
      
      if(response.ok){
        alert('student created succesfully')
      }
      else{
        alert('failed to add student')
      }
      alert('mhmd')
}

// alert('mhmd olleik')