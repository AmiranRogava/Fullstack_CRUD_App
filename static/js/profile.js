let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "/";
}

const { usernameOrEmail, password } = user;

const langMap = {
  python: 3,
  javascript: 1,
  cpp: 2,
};
var finished_tasks = []
var currentTheme = "vs-dark";
var themes = [
  "vs-dark",
  "Dracula",
  "Monokai",
  "Solarized-dark",
  "Solarized-light",
  "Night Owl",
  "Nord",
  "GitHub Dark",
  "GitHub Light",
  "Cobalt",
  "Tomorrow-Night",
];

document.addEventListener("DOMContentLoaded", () => {
    auth()
    langChange();
    fetchTasks();
});
function getUserLevel(points) {
  const levels = {
    "amateur": 0,   // Assuming 0 as the starting point for "amateur"
    "beginner": 13,
    "junior": 50,
    "master": 100
  };

  if (points >= levels.master) {
    return "master";
  } else if (points >= levels.junior) {
    return "junior";
  } else if (points >= levels.beginner) {
    return "beginner";
  } else {
    return "amateur";
  }
}

function auth() {
  fetch("/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username_or_email: usernameOrEmail, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Login failed");
      return res.json();
    })
    .then((data) => {
      const profile = document.querySelector(".profile");
      profile.innerHTML = "";

      if (data?.success) {
        const user = data.data;

        finished_tasks = user.finished_tasks
        const userLevel = getUserLevel(user.points);
        profile.innerHTML = `
                <img src="${user.img}" alt="Profile Picture">
                <h2>${user.username}</h2>
                <div>
                  <p>Full Name: ${user.first_name} ${user.last_name}</p>
                  <p class="allPoints">Points: ${user.points || "0"}</p>
                  <p class="level">Level: ${userLevel}</p> <!-- Added level here -->
                  <p>Email: ${user.email}</p>
                  <p>Age: ${user.age || "Not specified"}</p>
                  <p class="bio">Bio: ${user.bio || "No bio provided"}</p>
                
                  <br>
                  <button type="button" class="edit ui-btn"><span>Edit Profile</span></button>
                  <br>
                  <button onclick="logout()" type="button" class="ui-btn"><span>Log Out</span></button>
                </div>
            `;

        profile.querySelector(".edit").addEventListener("click", () => {
          const editForm = `
                    <form id="editForm">
                        <label for="img">Image:</label>
                        <input type="text" id="img" value="${user.img || ""}">
                        
                        <label for="age">Age:</label>
                        <input type="text" id="age" value="${user.age || ""}">
                        
                        <label for="bio">Bio:</label>
                        <textarea id="bio" maxlength="200">${user.bio || ""}</textarea>
                        <span>max number of characters is 200*</span>
                        <br>
                        <button type="submit" class="ui-btn"><span>Save
                        </span></button>
                    </form>
                    
                `;

          profile.innerHTML = editForm;

          profile
            .querySelector('button[type="submit"]')
            .addEventListener("click", (event) => {
              event.preventDefault();

              const updatedProfile = {
                username: user.username,
                img: document.getElementById("img").value,
                age: document.getElementById("age").value,
                bio: document.getElementById("bio").value,
              };

              fetch("/update_profile", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProfile),
              })
                .then((res) => {
                  if (!res.ok) throw new Error("Failed to update profile");
                  return res.json();
                })
                .then((data) => {
                  console.log(data.msg);
                  window.location.href = "/profile";
                })
                .catch((error) =>
                  console.error("Error updating profile:", error)
                );
            });
        });
      } else {
        profile.innerHTML = "<p>User not found</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching or parsing user data:", error);
      document.querySelector(".profile").innerHTML =
        "<p>Error loading profile</p>";
    });
}
function fetchTasks(language = "python") {

  const monacoEditor = document.querySelector(".monaco-editor")
  if (monacoEditor){
    document.querySelector(".content").innerHTML = "<div class='tasks'></div>"
  }
  const tasks = document.querySelector(".tasks");
  fetch("/exercises", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: usernameOrEmail, password, lang: language }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    })
    .then((data) => {
      tasks.innerHTML = "";
      exercises = data.msg;
      exercises.sort((a, b) => {
        return finished_tasks.includes(a.name) - finished_tasks.includes(b.name);
      });
      
      tasks.innerHTML = exercises
        .map(
          (task) => `
            <div class="notification ${ finished_tasks.includes(task.name) ? "done" : ""  } task" onclick="taskEnv('${task.name}','${language}')">
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle">${task.name} </div>
                <div class="notibody">${task.desc.length > 230 ? task.desc.split("\n")[0].slice(0, 230) + '...' : task.desc.split("\n")[0]}</div>
                <div class="notibody " > ${ finished_tasks.includes(task.name) ? "<span>Done</span>" : `<i>points: ${task.reward}</i>`  }</div>
            </div>
            
        `
        )
        .join("");
    })
    .catch((error) => console.error("Error fetching tasks:", error));
}

function taskEnv(taskName, newLanguage = null, choose = null, theme = null) {
  currentTask = exercises.find((task) => task.name === taskName);
  currentTask.lang = newLanguage
  if (!choose) document.querySelector(".tasks").remove();
  document.querySelector(".content").innerHTML = "";

  const optionsHtml = currentTask.langs
    .map(
      (lang) => `
        <div title="${lang}">
            <input lang="${lang}" id="option-${
        langMap[lang]
      }" name="option" type="checkbox" ${
        lang === (newLanguage || language) ? "checked" : ""
      } />
            <label class="option" for="option-${
              langMap[lang]
            }" data-txt="${lang}"></label>
        </div>
    `
    )
    .join("");

  document.querySelector(".content").innerHTML = `
        <div class="lang-selector">
            <div class="select ">
                <div class="selected" data-default="python" data-one="javascript" data-two="cpp" data-three="python">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="arrow">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                    </svg>
                </div>
                <div class="options">${optionsHtml}</div>
            </div>   
        </div>

        <div class="theme-selector">
            
        </div>
        <button class="back-button" onclick="fetchTasks('${currentTask.lang}')">< Back</button>
        <button class="run-button" onclick="check_code()">Run > </button>
        <button class="sub-button" disabled onclick="submit()">submit </button>
        <div id="container">
        </div>

     <div class="output">
        <p class="deffault"><span>===</span> output here <span>===</span></p>
     </div>
    `;

  require(["vs/editor/editor.main"], function () {
    const editor = monaco.editor.create(document.getElementById("container"), {
      value: getComment(currentTask, newLanguage),
      language: newLanguage || language,
      theme: currentTheme,
    });

    document
      .querySelectorAll(".lang-selector input[name='option']")
      .forEach((el) => {
        el.addEventListener("change", function () {
          const newLanguage = this.getAttribute("lang");
          taskEnv(taskName, newLanguage, true);
          monaco.editor.setModelLanguage(
            editor.getModel(),
            newLanguage.toLowerCase()
          );
        });
      });

    load_theme_selector();
  });
}

function getComment(task, lang) {
  if (lang === "python") {
    return `"""
DO NOT REMOVE COMMENTS!
${task.name}
${task.desc}
${task.reward}
"""`;
  } else {
    return `/*
DO NOT REMOVE COMMENTS!
${task.name}
${task.desc}
${task.reward}
*/`;
  }
}

function logout() {
  localStorage.setItem("user", 0);
  window.location.href = "/login";
}

function langChange() {
  document
    .querySelectorAll('header input[name="value-radio"]')
    .forEach((radioButton) => {
      radioButton.addEventListener("change", function () {
        const langName = document.querySelector(
          ` label[for="${this.id}"]`
        ).textContent;
       
        // alert()
        
        fetchTasks(langName.toLowerCase());
        
       
      });
    });

  require.config({
    paths: {
      "vs": "https://unpkg.com/monaco-editor@latest/min/vs",
      "monaco-themes": "https://unpkg.com/monaco-themes/dist/monaco-themes",
    },

    waitSeconds: 60,
  });
}
function set_theme(theme) {
  // https://unpkg.com/browse/monaco-themes@0.4.4/themes/
  fetch(`https://unpkg.com/monaco-themes@0.4.4/themes/${theme}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Theme not found");
      }
      return response.json();
    })
    .then((data) => {
      // Sanitize the theme name to remove illegal characters
      const sanitizedThemeName = theme.replace(/[^a-zA-Z0-9-_]/g, "");
      monaco.editor.defineTheme(sanitizedThemeName, data);
      monaco.editor.setTheme(sanitizedThemeName);
      console.log(`Theme applied: ${sanitizedThemeName}`);
    })
    .catch((error) => {
      console.error("Error loading theme:", error);
      monaco.editor.setTheme("vs-dark"); // Fallback to a default theme
    });

  document.querySelector("#container").style.opacity = 0;
  document.querySelector(".output").style.opacity = 0;

  setTimeout(() => {
    const editorElement = document.querySelector(".monaco-editor");

    // Get the computed styles of the element
    const computedStyles = getComputedStyle(editorElement);

    // Retrieve the value of the CSS variable
    const backgroundColor = computedStyles
      .getPropertyValue("--vscode-editor-background")
      .trim();
    document.querySelector("#container").style.backgroundColor =
      backgroundColor;
    document.querySelector(".output").style.backgroundColor = backgroundColor;

    document.querySelector("#container").style.opacity = 1;
    document.querySelector(".output").style.opacity = 1;
  }, 400);
}

function load_theme_selector(theme = "vs-dark") {
  document.querySelector(".theme-selector").innerHTML = "";
  currentTheme = theme;
  const optionsHtml = themes
    .map(
      (theme, index) => `
    <div title="${theme}">
        <input theme="${theme}" id="opt${index}" name="option" type="checkbox" value="${theme}" ${
        theme == currentTheme ? "checked" : ""
      } />
        <label class="option" for="opt${index}" data-txt="${theme}">${theme}</label>
    </div>
    `
    )
    .join("");

  document.querySelector(".theme-selector").innerHTML = `<div class="select">
            <div class="selected" data-def="vs-dark"
                data-on="Dracula"
                data-tw="Monokai"
                data-th="Solarized-dark"
                data-fo="Solarized-light"
                data-fi="Night Owl"
                data-si="Nord"
                data-se="GitHub Dark"
                data-ei="GitHub Light"
                data-ni="Cobalt"
                data-te="Tomorrow-Night"
                data-el="vs-dark">
         
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="arrow">
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                </svg>
            </div>
            <div class="options">${optionsHtml}</div>
        </div>    
        
        
    `;

  document
    .querySelectorAll('.theme-selector input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        if (event.target.checked) {
          set_theme(event.target.value);
          load_theme_selector(event.target.value);
        }
      });
    });
}


function check_code() {
  if (currentTask.lang != "python"){
    console.log("only python is supported yet")
    // return 
  }
  const lines = document.querySelectorAll(".view-line");

  // Filter out lines that contain the word 'print' and join the remaining lines with newline characters
  codes = Array.from(lines)
    .map((line) => line.textContent)
    .filter((text) => !text.includes("print") || !text.includes("console.log"))
    .join("\n");

  // console.log(codes.split('"""')[2].replace(" ", ""));
  var fails = 0;
  var codes


  if (currentTask.lang == "python"){
    codes = codes.split('"""');
    codes = codes[2].trim();
  }
  else{
    codes = codes.split('*/');
    codes = codes[1].trim();
  }

  let containsNumbersOrLetters = /[a-zA-Z0-9]/.test(codes);

  if (!containsNumbersOrLetters) {
    codes = "<deffault>";
    fails += 1;
  }

  fetch("/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: codes, tests: currentTask.tests , lang: currentTask.lang}),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Login failed");
      return res.json();
    })
    .then((data) => {
      let container = document.querySelector(".output");
      container.classList.add("hidden");
      container.innerHTML = "";
      Object.keys(data).forEach((key) => {
        const p = document.createElement("p");
        if (data[key].includes("Error")) {
          if (currentTask.lang == "python"){
            data[key] = data[key].split("line ")[1].slice(3);
          }
          
        }
        p.innerHTML = `<span>${key}</span> <span>${data[key]}</span>`;

        if (data[key].includes("Error") || data[key][0].includes("fail")) {
          p.classList.add("fail");
          fails += 1;
        } else {
          p.classList.add("success");
        }

        container.appendChild(p);
      });
      if (fails == 0) {
        document.querySelector(".sub-button").style.opacity = 1;
        document.querySelector(".sub-button").removeAttribute("disabled")
        fails = 0;
        
      }

      setTimeout(() => {
        container.classList.remove("hidden");
      }, 300);
    });
}

function submit() {
  fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameOrEmail,
      task: currentTask.name,
      reward: currentTask.reward,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("submition failed");
      return res.json();
    })
    .then((data) => {
      if (!data.msg.includes("task already done")) {
        auth()
        setTimeout(() => {
          fetchTasks(currentTask.lang)
        }, 600);

      }else{
        document.querySelector(".output").innerHTML = `<p class="fail"><span>This task has already been completed.</span> <span>Unfortunately, you can't receive the reward.</span></p>`;
    }
    });
}


