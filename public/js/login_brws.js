form.addEventListener('submit', async ()=>{
    const login_data = {
        email: email_L.value,
        password: Pswrd_L.value
    }
    await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(login_data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(data => {
            if (data.status == 'error_L') {
                Sucz_L.style.display = 'none';
                err_L.style.display = 'block';
                err_L.innerText = data.error;
            }
            else {
                err_L.style.display = 'none';
                Sucz_L.style.display = 'block';
                Sucz_L.innerText = data.success;
            }
        });
});