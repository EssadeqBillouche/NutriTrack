

document.getElementById('registerForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value;
  const first_name = document.getElementById('firstName').value;
  const last_name = document.getElementById('lastName').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const gender = document.getElementById('gender').value;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  const activitylevel = document.getElementById('activitylevel').value;
  const goal = document.getElementById('goal').value;

  if(password !== confirmPassword){
    alert('pssword miss match');
    return
  }
  if(age < 18){
    alert('Must be adulte')
    return
  }

  const UserData = {
    first_name : first_name,
    last_name : last_name,
    email : email,
    password : password,
    gender : gender,
    height : height,
    weight : weight,
    activitylevel : activitylevel,
    goal : goal
  }

  const req = await fetch('http://localhost:3000/auth/register', {
    method : "POST",
    headers : {
      "content-type" : "application/json"
    },
    body : JSON.stringify(UserData)
  })

  if(req.ok){
    const res = await req.json();
    window.location.replace('http://localhost:3000/auth/login')
    
  }else{
    const error = await req.json();
    console.error('error with ', req.status, error)
  }


})