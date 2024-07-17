document.addEventListener('DOMContentLoaded', () => {
    try{
            if (JSON.parse(localStorage.getItem("user")).status){
        window.location.href="/profile"
        }
    }catch{}

    let log_button = document.querySelector(".log");
    log_button.addEventListener("click", log_in);
});

function log_in() {
    let usernameOrEmail = document.querySelector("#username_or_email").value;
    let password = document.querySelector("#password").value;
    let errtag = document.querySelector(".res");
    errtag.style.display = "block";

    fetch("/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username_or_email: usernameOrEmail,
            password: password,
        }),
    })
    .then(res => {
        if (!res.ok) {
            throw res;
        }
        return res.json();
    })
    .then(data => {
        if (data.success) {
            localStorage.setItem("user", JSON.stringify({
                "usernameOrEmail": usernameOrEmail,
                "password": password,
                "status":true
            }));
            errtag.textContent = "Login successful!";
            errtag.classList.add("success");
            errtag.classList.remove("err");
            
        } else {
            errtag.textContent = data.msg;
            errtag.classList.add("err");
            errtag.classList.remove("success");
        }
    })
    .catch(err => {
        err.json().then(error => {
            errtag.textContent = error.msg || "Login failed";
            errtag.classList.add("err");
            errtag.classList.remove("success");
        });
    });

    setTimeout(() => {
        errtag.style.display = "none";
        window.location.href = "/profile";
    }, 500);

   
}
