
from flask import jsonify
import json



def isRegistered(user):
    with open("databases/users.json", encoding="utf-8") as f:
        users = json.load(f)

    user = [exist for exist in users if exist == user ]
    return len(user)

def addUser(user):
    
    with open("databases/users.json", encoding="utf-8") as f:
        users = json.load(f)
        
    users.append(user)
    
    with open("databases/users.json","w", encoding="utf-8") as f:
        json.dump(users, f, indent=4, ensure_ascii=False)
        return jsonify({"msg":f"user {user.get('username')} added!"})

    
