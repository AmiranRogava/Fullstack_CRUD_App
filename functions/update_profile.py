import json
import os
from flask import jsonify

def update_profile(username, updated_data):
    try:
        with open(os.path.join('databases', 'users.json'), 'r+', encoding='utf-8') as f:
            users = json.load(f)
            for user in users:
                if user['username'] == username:
                    for key, value in updated_data.items():
                        user[key] = value
                    f.seek(0)
                    json.dump(users, f, indent=4, ensure_ascii=False)
                    f.truncate()
                    return jsonify({"msg": "Profile updated successfully", "user": user}), 200
            return jsonify({"msg": "User not found"}), 404
    except Exception as e:
        print(f"Error updating profile: {e}")
        return jsonify({"msg": "Error updating profile"}), 500
