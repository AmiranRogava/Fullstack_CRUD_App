let user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "/"
}

let usernameOrEmail = user.usernameOrEmail;
let password = user.password;

var exercises;
var currentTask;

var lang_map = {
    "python":3,
    "javascript":1,
    "cpp":2
}

document.addEventListener('DOMContentLoaded', () => {
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
                throw new Error('Login failed');
            }
            return res.json();
        })
        .then(data => {
            let profile = document.querySelector(".profile");
            profile.innerHTML = '';

            if (data && data.success) {
                var user = data.data;
                profile.innerHTML = `
                    <img src="${user.img}" alt="Profile Picture">
                    <h2>${user.first_name}</h2>
                    <div>
                        <p>Name: ${user.first_name} ${user.last_name}</p>
                        <p>Email: ${user.email}</p>
                        <p>Location: ${user.location || 'Not specified'}</p>
                        <p>Phone: ${user.phone || 'Not specified'}</p>
                        <p>Age: ${user.age || 'Not specified'}</p>
                        <p>Bio: ${user.bio || 'No bio provided'}</p>
                         <br>
                        <button  type="submit" class="edit ui-btn">
                                <span>
                                   Edit Profile
                                </span>
                        </button>
                        <br>
                        <button onclick="logout()"  type="submit" class="ui-btn">
                                <span>
                                  Log Out
                                </span>
                        </button>
                `;

                let editButton = profile.querySelector('.edit');
                editButton.addEventListener('click', () => {
                    console.log(user)
                    let editForm = `
                        <form id="editForm">
                            <label for="img">image:</label>
                            <input type="text" id="img" value="${user.img || ''}">
                            <br>
                            <label for="location">Location:</label>
                            <input type="text" id="location" value="${user.location || ''}">
                            <br>
                            <label for="phone">Phone:</label>
                            <input type="text" id="phone" value="${user.phone || ''}">
                            <br>
                            <label for="age">Age:</label>
                            <input type="text" id="age" value="${user.age || ''}">
                            <br>
                            <label for="bio">Bio:</label>
                            <textarea id="bio">${user.bio || ''}</textarea>
                            <br>
                            <button type="submit" class="ui-btn">
                                <span>
                                   Save
                                </span>
                            </button>
                       
                        </form>
                    `;

                    profile.innerHTML = editForm;

                    let saveButton = profile.querySelector('button[type="submit"]');
                    saveButton.addEventListener('click', (event) => {
                        event.preventDefault();

                        let updatedProfile = {
                            location: document.getElementById('location').value,
                            img: document.getElementById('img').value,
                            phone: document.getElementById('phone').value,
                            age: document.getElementById('age').value,
                            bio: document.getElementById('bio').value
                        };

                        fetch("/update_profile", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updatedProfile)
                        })
                            .then(res => {
                                if (!res.ok) {
                                    throw new Error('Failed to update profile');
                                }
                                return res.json();
                            })
                            .then(data => {

                                console.log(data.msg);

                                window.location.href = '/profile';
                            })
                            .catch(error => {
                                console.error('Error updating profile:', error);

                            });
                    });
                });
            } else {
                profile.innerHTML = '<p>User not found</p>';
            }
        })
        .catch(error => {

            console.error('Error fetching or parsing user data:', error);
            let profile = document.querySelector(".profile");
            profile.innerHTML = '<p>Error loading profile</p>';
        });






});





function fetch_tasks(language = "python") {
    let tasks = document.querySelector(".tasks")
    fetch("/exercises", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: usernameOrEmail,
            password: password,
            lang: language
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Login failed');
            }
            return res.json();
        })
        .then(data => {
            tasks.innerHTML = ""
            exercises = data.msg
            for (var task of data.msg) {
                tasks.innerHTML += `
                <div class="notification task" onclick="taskEnv('${task.name}')">
                    <div class="notiglow"></div>
                    <div class="notiborderglow"></div>
                    <div class="notititle">${task.name}</div>
                    <div class="notibody">${task.desc}</div>
                    <div class="notibody">points: ${task.reward}</div>
                </div>
            `
            }


        })
}

function taskEnv(taskName, newLanguage = null, choose = null) {

    currentTask = exercises.filter(task => task.name == taskName)[0]
    if (!choose) {
        document.querySelector(".tasks").remove()
    }
    document.querySelector(".content").innerHTML = ""

    document.querySelector(".content").innerHTML += `
    <div class="select">
        <div class="selected" data-default="python" data-one="javascript" data-two="cpp" data-three="python">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="arrow">
                <path
                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                </path>
            </svg>
        </div>
        <div class="options">
            
        </div>
    </div>    

    <div id="container"></div>
`;

    let currentlang = currentTask.langs[0];
    if (newLanguage) {
        currentlang = newLanguage;
    }

    let languages = document.querySelector(".options");

    languages.innerHTML += `  <div title="${currentlang}">
    <input lang="${currentlang}" checked id="option-${lang_map[currentlang]}" name="option" type="radio" />
    <label class="option" for="option-${lang_map[currentlang]}" data-txt="${currentlang}"></label>
</div>`;

    for (let lang of currentTask.langs) {
        if (lang == currentlang) {
            continue;
        }
        languages.innerHTML += `  <div title="${lang}">
            <input  lang="${lang}" id="option-${lang_map[lang]}" name="option" type="radio" />
            <label class="option" for="option-${lang_map[lang]}" data-txt="${lang}"></label>
    </div>`;
    }



    if (currentlang == "python") {
        comment = `"""
${currentTask.name}
${currentTask.desc}
${currentTask.reward}
"""`
    } else if (currentlang == "javascript" || currentlang == "cpp") {
        comment = `/*
${currentTask.name}
${currentTask.desc}
${currentTask.reward}
*/`
    }

    require(['vs/editor/editor.main'], function () {

        var editor = monaco.editor.create(document.getElementById('container'), {
            value: comment,
            language: currentlang,
            theme: 'vs-dark'
        });

        // Function to change theme
        // document.getElementById('theme').addEventListener('change', function () {
        //     var newTheme = this.value;
        //     monaco.editor.setTheme(newTheme);

        // });


        document.querySelectorAll("input").forEach(el=>{
            el.addEventListener("change",function () {
                var newLanguage = this.getAttribute("lang")
              
                taskEnv(taskName, newLanguage, true)
                monaco.editor.setModelLanguage(editor.getModel(), newLanguage.toLowerCase());
    
            })
        })

       

    });

}


function logout() {
    localStorage.setItem("user", 0);
    window.location.href = "/"

}

function langChange() {

    const radioButtons = document.querySelectorAll('input[name="value-radio"]');

    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', function () {
            // Get the label for the selected radio button
            const label = document.querySelector(`label[for="${this.id}"]`);

            // Get the language name (label text)
            const langName = label.textContent;

            fetch_tasks(langName.toLowerCase())
        });
    });




    require.config({
        paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' },
        waitSeconds: 60 // Increase the timeout to 60 seconds
    });





}


langChange()
fetch_tasks()