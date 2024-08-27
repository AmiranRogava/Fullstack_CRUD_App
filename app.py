from flask import Flask, render_template, request, jsonify, redirect, url_for
import json, os
from functions.registration import isRegistered, addUser
from functions.decorators import validate_form,authorize
from functions.update_profile import update_profile
import functions.update_points as update_points
import functions.checker as checker

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/get_users')
def get_users():
    with open('databases/users.json', 'r') as f:
        users = json.load(f)
    return jsonify(users)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/auth', methods=["POST"])
def auth():
    data = request.get_json()
    username_or_email = data.get('username_or_email')
    password = data.get('password')
    
    with open("databases/users.json", encoding="utf-8") as f:
        users = json.load(f)
    
    user = next((u for u in users if (u['username'] == username_or_email or u['email'] == username_or_email) and u['password'] == password), None)
    
    if user:
        return jsonify({"msg": "Logging in", "data": user, "success": True}), 200
    else:
        return jsonify({"msg": "Invalid username or password", "success": False}), 401

@app.route('/profile')
def profile():
 
    
    try:
       return render_template('profile.html')
    except Exception as e:
        print(f"Error loading user data: {e}")
        return jsonify({"msg": "Error loading user data"}), 500

@app.route('/register', methods=["GET", "POST"])
@validate_form
def register():
    if request.method == "POST":
        user = request.get_json()
        if isRegistered(user):
            return jsonify({"msg": "User already registered"}), 409
        return addUser(user)
    return render_template('register.html')

@app.route('/reset')
def reset():
    return render_template('reset.html')


@app.route("/exercises", methods=["POST"])
@authorize
def get_tasks():
    with open("databases/exercises.json", encoding="utf-8") as f:
        task_db = json.load(f)
        
    data = request.get_json()
    
    if "lang" in data:
            tasks = list(filter(lambda task: data.get("lang") in task["langs"], task_db["exercises"]))
            return jsonify({"msg":tasks})
    return jsonify({"msg": "there is no tasks"})

@app.route("/check", methods=["POST"])
def answer_checker():
    data = request.get_json()
    code = data.get("code").replace(" ", " ")

    with open("tempcode.py", "w") as f: 
        f.write("")
    try:
        with open("tempcode.py", "w", encoding="utf8") as f:
            f.write(code)
    except:
        pass
    if "<deffault>" in code:
        return jsonify({"⚠️⚠️ You are": " Lazy    ⚠️⚠️"})
    res = checker.check(data.get("tests"))

    return jsonify(res)
    

@app.route('/update_profile', methods=["POST"])
def handle_update_profile():
    data = request.get_json()
    username = data.get('username')
    
    return update_profile(username, data)


@app.route("/submit", methods=["POST"])
def submit_code():
    data = request.get_json()
    username = data.get('username')
    task = data.get('task')
    reward = data.get('reward')
    return update_points.update(username, task, reward)
    
if __name__ == '__main__':
    app.run(debug=True)
