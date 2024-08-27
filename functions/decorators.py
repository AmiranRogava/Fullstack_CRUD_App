from functools import wraps
from flask import request, jsonify
import json

def validate_form(f):
    @wraps(f)
    def inner(*args, **kwargs):
        if request.method == "GET":
            return f(*args, **kwargs)
        user = request.get_json()
        fields = ["email", "username", "first_name", "last_name", "password"]
        for field in fields:
            if not user.get(field):
                return jsonify({"msg": f"{field} is required"}), 400
            
        if len(user.get("password")) < 8:
            return jsonify({"msg": "password length is less than 8"}), 400
        return f(*args, **kwargs)
    return inner

def authorize(f):
    @wraps(f)
    def inner(*args, **kwargs):
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')
            
            # Load users from JSON file
            with open("databases/users.json", encoding="utf-8") as file:
                users = json.load(file)
            
            # Find user with matching credentials
            user = next((u for u in users if (u.get('username') == email or u.get('email') == email) and u.get('password') == password), None)
            
            if not user:
                return jsonify({"error": "Invalid username or password"}), 401  # Unauthorized
            
            # If user is authenticated, proceed to the decorated function
            return f(*args, **kwargs)
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500  # Internal Server Error
    
    return inner

# Flask app setup and routes ...

