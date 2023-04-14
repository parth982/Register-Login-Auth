form.addEventListener("submit", async () => {
  const register_data = {
    email: email_R.value,
    password: Pswrd_R.value,
  };
  await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(register_data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "error_R") {
        Sucz_R.style.display = "none";
        err_R.style.display = "block";
        err_R.innerText = data.error;
      } else {
        err_R.style.display = "none";
        Sucz_R.style.display = "block";
        Sucz_R.innerText = data.success;
      }
    });
});
