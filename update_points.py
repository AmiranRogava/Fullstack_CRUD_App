import json
import os
from flask import jsonify

def update(username, task, reward):
    try:
    
        with open(os.path.join('databases', 'users.json'), 'r+', encoding='utf-8') as f:
            users = json.load(f)
            for user in users:
                if user['username'] == username:
                    user.setdefault("points",0)
                  
                    user.setdefault("finished_tasks",[])
                    if task in user["finished_tasks"]:
                        return jsonify({"msg": "task already done", "user": user}), 401
                    
                    user["points"] += reward
                    user["finished_tasks"].append(task)
                    f.seek(0)
                    json.dump(users, f, indent=4, ensure_ascii=False)
                    f.truncate()
                    return jsonify({"msg": "Points updated successfully", "user": user}), 200
            return jsonify({"msg": "User not found"}), 404
    except Exception as e:
        print(f"Error updating Points: {e}")
        return jsonify({"msg": "Error updating Points"}), 500
