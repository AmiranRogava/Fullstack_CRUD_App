

var reg_button = document.querySelector(".reg")


reg_button.addEventListener("click", submitForm)



function submitForm (){
    errtag = document.querySelector(".res")
    errtag.style.display = "block"

    email = document.querySelector("#email").value
    username = document.querySelector("#username").value
    first_name = document.querySelector("#first_name").value
    last_name = document.querySelector("#last_name").value
    password = document.querySelector("#password").value
    user = {
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "points": 0,
        "finished_tasks": [],
        "img": "https://wallpapers-clan.com/wp-content/uploads/2023/05/cool-pfp-02.jpg",
        "age": "",
        "bio": "" 
    }
    fetch("/register", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user)
    })
    .then(res => {
        
        if (!res.ok){
            throw res
        }
        return  res.json()
    })

    .then(data=>{
        
     
        errtag.textContent = data.msg

        document.querySelector("#email").value = ""
        document.querySelector("#username").value = ""
        document.querySelector("#first_name").value = ""
        document.querySelector("#last_name").value = ""
        document.querySelector("#password").value = ""
        

        document.querySelector(".res").classList.add("success")
        document.querySelector(".res").classList.remove("err")
        
        log_in(username, password);
        
    })
    .catch(err => {
        err.json().then(error=>{
            errtag.textContent = error.msg
            document.querySelector(".res").classList.add("err")
            document.querySelector(".res").classList.remove("success")
        })
    })



    setTimeout(()=>{
        errtag.style.display = "none"
    }, 1000)

}
function log_in(usernameOrEmail, password) {
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
                "status": true
            }));
            window.location.href = "/profile";
        } else {
            console.error("Login failed:", data.msg);
        }
    })
    .catch(err => {
        err.json().then(error => {
            console.error("Error during login:", error.msg || "Login failed");
        });
    });
}
