let user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "/";
}

const { usernameOrEmail, password } = user;

const langMap = {
    "python": 3,
    "javascript": 1,
    "cpp": 2
};

document.addEventListener('DOMContentLoaded', () => {
    fetch("/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username_or_email: usernameOrEmail, password })
    })
    .then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    })
    .then(data => {
        const profile = document.querySelector(".profile");
        profile.innerHTML = '';

        if (data?.success) {
            const user = data.data;
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
                    <button type="button" class="edit ui-btn">Edit Profile</button>
                    <br>
                    <button onclick="logout()" type="button" class="ui-btn">Log Out</button>
            `;

            profile.querySelector('.edit').addEventListener('click', () => {
                const editForm = `
                    <form id="editForm">
                        <label for="img">Image:</label>
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
                        <button type="submit" class="ui-btn">Save</button>
                    </form>
                `;

                profile.innerHTML = editForm;

                profile.querySelector('button[type="submit"]').addEventListener('click', event => {
                    event.preventDefault();

                    const updatedProfile = {
                        location: document.getElementById('location').value,
                        img: document.getElementById('img').value,
                        phone: document.getElementById('phone').value,
                        age: document.getElementById('age').value,
                        bio: document.getElementById('bio').value
                    };

                    fetch("/update_profile", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedProfile)
                    })
                    .then(res => {
                        if (!res.ok) throw new Error('Failed to update profile');
                        return res.json();
                    })
                    .then(data => {
                        console.log(data.msg);
                        window.location.href = '/profile';
                    })
                    .catch(error => console.error('Error updating profile:', error));
                });
            });
        } else {
            profile.innerHTML = '<p>User not found</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching or parsing user data:', error);
        document.querySelector(".profile").innerHTML = '<p>Error loading profile</p>';
    });
});

function fetchTasks(language = "python") {
    const tasks = document.querySelector(".tasks");
    fetch("/exercises", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: usernameOrEmail, password, lang: language })
    })
    .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
    })
    .then(data => {
        tasks.innerHTML = "";
        exercises = data.msg;
        tasks.innerHTML = exercises.map(task => `
            <div class="notification task" onclick="taskEnv('${task.name}')">
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle">${task.name}</div>
                <div class="notibody">${task.desc}</div>
                <div class="notibody">points: ${task.reward}</div>
            </div>
        `).join('');
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

function taskEnv(taskName, newLanguage = null, choose = null) {
    currentTask = exercises.find(task => task.name === taskName);
    if (!choose) document.querySelector(".tasks").remove();
    document.querySelector(".content").innerHTML = '';

    const optionsHtml = currentTask.langs.map(lang => `
        <div title="${lang}">
            <input lang="${lang}" id="option-${langMap[lang]}" name="option" type="radio" ${lang === (newLanguage || currentTask.langs[0]) ? 'checked' : ''} />
            <label class="option" for="option-${langMap[lang]}" data-txt="${lang}"></label>
        </div>
    `).join('');

    document.querySelector(".content").innerHTML = `
        <div class="select">
            <div class="selected" data-default="python" data-one="javascript" data-two="cpp" data-three="python">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="arrow">
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                </svg>
            </div>
            <div class="options">${optionsHtml}</div>
        </div>    
        <div id="container"></div>
    `;

    require(['vs/editor/editor.main'], function () {
        const editor = monaco.editor.create(document.getElementById('container'), {
            value: getComment(currentTask, newLanguage),
            language: newLanguage || currentTask.langs[0],
            theme: 'vs-dark'
        });

        document.querySelectorAll("input[name='option']").forEach(el => {
            el.addEventListener("change", function () {
                const newLanguage = this.getAttribute("lang");
                taskEnv(taskName, newLanguage, true);
                monaco.editor.setModelLanguage(editor.getModel(), newLanguage.toLowerCase());
            });
        });
    });
}

function getComment(task, lang) {
    if (lang === "python") {
        return `"""
${task.name}
${task.desc}
${task.reward}
"""`;
    } else {
        return `/*
${task.name}
${task.desc}
${task.reward}
*/`;
    }
}

function logout() {
    localStorage.setItem("user", 0);
    window.location.href = "/";
}

function langChange() {
    document.querySelectorAll('input[name="value-radio"]').forEach(radioButton => {
        radioButton.addEventListener('change', function () {
            const langName = document.querySelector(`label[for="${this.id}"]`).textContent;
            fetchTasks(langName.toLowerCase());
        });
    });

    require.config({
        paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' },
        waitSeconds: 60
    });
}

langChange();
fetchTasks();
