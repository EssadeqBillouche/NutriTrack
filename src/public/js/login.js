document.getElementById('loginForm').addEventListener('submit', async (e)=>{
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const login = {
        email : email,
        password : password
    }

    const req = await fetch('http://localhost:3000/auth/login', {
        method : "POST",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(login)
    });
    if(req.ok){
        const result = await req.json();
        window.location.replace('http//localhoast:3000/dashboard')
    }else{
        const error = await req.json();
        console.error('error with login : ', error);
    }
    
})