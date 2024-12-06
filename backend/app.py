from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv
import jwt # this library is for generating tokens for authentication process and ensuring the proces of login and signup in frontend
from datetime import datetime, timedelta


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
BLACKLIST = set()


# Create the path to the users.json file
DATA_FILE = os.path.join(os.getcwd(), 'data', 'data', 'users.json')
SECRET_KEY = os.getenv('SECRET_KEY')

# Ensure the directory exists
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

@app.route('/')
def home():
    return jsonify({"message": "Backend and frontend connected successfully!"})

# Helper function to read users
def read_users():
    with open(DATA_FILE, 'r') as file:
        return json.load(file)

# Helper function to write users
def write_users(data):
    print(data)
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)

@app.route('/update_project', methods=['POST'])
def f_update_project():
    try:
        print('Updating starting !!!')
        
        # Parse incoming JSON data
        data = request.json
        project_data = data.get('project_data') 
        current_user = data.get('current_user') 
        project_name = data.get('project_name')
        print('Project response received')
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Read existing user data
        print('Line 53: User data fetched')
        print('Below is the user data:')
        print(project_name) 
        print(current_user) 
        
        
        user_data = read_users()
        # Ensure that 'projects' exists in user_data
        # print(user_data)
        if 'projects' not in user_data:
            return jsonify({"error": "Projects not found in user data"}), 400
        
        # Iterate through the projects list and update the matching project
        project_updated = False  # Flag to track if any project was updated
        # print(project_data)
        print(user_data['projects'])
        for i, project in enumerate(user_data['projects']): 
            print(project['admin'])
            print(project['name'])
            print(project['name'])
            print(project_name)
            if project['admin'] == current_user and project['name'] == project_name:
                # Update the project with the new data
                print('condition match hot ahe')
                print(user_data['projects'][i])
                print()
                print()
                user_data['projects'][i] = project_data # Update the project with new data
                print('after updation')
                print(user_data['projects'][i])
                print('')
                print('')
                project_updated = True
                break  # Exit loop after the first match is found
        
        # If no project was updated, return an error
        if not project_updated:
            return jsonify({"error": "Project not found or user is not admin"}), 400
        
        # Write updated data back
        print('Updated user data:', user_data)
        write_users(user_data)
        
        return jsonify({"message": "Project updated successfully!"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/delete_project', methods=['POST'])
def df_update_project():
    try:
        print('Deletion starting !!!')
        
        # Parse incoming JSON data
        data = request.json
        current_user = data.get('current_user') 
        project_name = data.get('project_name')
        print('Project response received')
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Read existing user data
        user_data = read_users()
        print('Line 53: User data fetched')
        print('Below is the user data:')
        print(f"Current User: {current_user}, Project Name: {project_name}")
        
        # Ensure that 'projects' exists in user_data
        if 'projects' not in user_data:
            return jsonify({"error": "Projects not found in user data"}), 400
        
        # Filter out the project to delete
        updated_projects = [
            project for project in user_data['projects'] 
            if not (project['admin'] == current_user and project['name'] == project_name)
        ]
        
        # If no project was deleted, return an error
        if len(updated_projects) == len(user_data['projects']):
            return jsonify({"error": "Project not found or user is not admin"}), 400
        
        # Update the user data with the filtered projects
        user_data['projects'] = updated_projects
        
        # Write updated data back
        write_users(user_data)
        
        print('Updated user data:', user_data)
        return jsonify({"message": "Project deleted successfully!"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    role = data.get('role')
    if not username or not password:
        return jsonify({"message": "Username and password are required!"}), 400

    users_data = read_users()
    if any(user['username'] == username for user in users_data['users']):
        return jsonify({"message": "User already exists!"}), 400

    users_data['users'].append({"username": username, "password": password,"email":email,"role":role})
    write_users(users_data)
    return jsonify({"message": "User registered successfully."}), 200

@app.route('/update_tasks', methods=['POST'])
def n_update_tasks(): 
    try:
        print('Updating tasks starting !!!')
        # Parse incoming JSON data
        data = request.json
        # print("Received data:", data)

        # Extract required data from the JSON payload
        task_data = data.get('task_data')
        project_name = data.get('project_name')
        print('project name is ',project_name) 
        # print(task_data)

        if not data or not project_name or not task_data:
            return jsonify({"error": "Project name and task data are required!"}), 400
        
        # Read existing user data
        user_data = read_users()
        print('User data fetched successfully.')

        # Ensure "projects" exists in user_data
        if "projects" not in user_data:
            user_data["projects"] = []
        
        # Update the "Users" attribute of the specified project
        project_found = False
        # print(task_data) 
        print('')
        ind = 0
        for project in user_data['projects']: 
            print(project.get('name'))
            if project.get('name') == project_name:  # Access project name correctly
                project['Users'] = task_data  # Update the "Users" attribute
                # print(user_data['projects'][ind]['Users'])
                project_found = True
                break  # Exit the loop once the project is found
            ind = ind + 1
        
        if not project_found:
            return jsonify({"error": f"Project '{project_name}' not found!"}), 404
        
        # Write updated data back
        write_users(user_data)
        print('User data updated successfully.')

        return jsonify({"message": "Project tasks updated successfully!"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add_projects',methods=['POST']) 
def add_project(): 
    data1 = request.json
    data = data1['project_data']
    print(data)

    if not data:
        return jsonify({"message": "data is not supplied!"}), 400

    users_data = read_users()
    print(users_data)
    if len(users_data['projects']) != 0 and any(user['name'] == data['name'] for user in users_data['projects']):
        return jsonify({"message": "Project Name already exists!, Please go for unique name"}), 400

    users_data['projects'].append(data)
    write_users(users_data)
    return jsonify({"message": "User registered successfully."}), 200


    

@app.route('/adminsignup', methods=['POST'])
def admin_signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    print(username) 
    print(email)
    if not username or not password:
        return jsonify({"message": "Username and password are required!"}), 400

    users_data = read_users()
    print(users_data)
    print(len(users_data['admin']))
    if len(users_data['admin']) != 0 and any(user['username'] == username for user in users_data['admin']):
        return jsonify({"message": "User already exists!"}), 400

    users_data['admin'].append({"username": username, "password": password,"email":email})
    write_users(users_data)
    return jsonify({"message": "User registered successfully."}), 200



@app.route('/logout', methods=['POST'])
def logout():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing!"}), 400

    try:
        token = token.split(" ")[1]  # Extract token from "Bearer <token>"
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])

        # Add token to the blacklist
        BLACKLIST.add(token)
        
        return jsonify({"message": "Successfully logged out!"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has already expired!"}), 400
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token!"}), 400


# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    print(username) 
    print(password)
    name = ''
    if not username or not password:
        return jsonify({"message": "Username and password are required!"}), 400
    print('79')
    users_data = read_users()
    for user in users_data['users']:
        if user['email'] == username and user['password'] == password:
            name = user['username']
            token = jwt.encode({
                'user_id': user['username'],
                'exp': datetime.now() + timedelta(hours=1)
            }, SECRET_KEY, algorithm='HS256')

            return jsonify({"message": "Login successful!","username":name,"level":"user","role":user['role'],"token": token}), 200
        
    for user in users_data['admin']:
        if user['email'] == username and user['password'] == password:
            name = user['username']
            token = jwt.encode({
                'user_id': user['username'],
                'exp': datetime.now() + timedelta(hours=1)
            }, SECRET_KEY, algorithm='HS256')

            return jsonify({"message": "Login successful!","username":name,"level":"admin", "token": token}), 200



    return jsonify({"message": "Invalid username or password!"}), 401

@app.route('/update_user_tasks', methods=['POST'])
def update_user_tasks():
    try:
        # Parse the incoming JSON data
        data = request.json
        project_name = data.get('project_name')
        username = data.get('username')
        task_data = data.get('task_data')
        print(username) 
        print(project_name) 
        print(task_data)
        if not project_name or not username or not task_data:
            return jsonify({"error": "Invalid or missing parameters"}), 400

        # Read the existing projects data
        user_data = read_users()  # Assuming it reads the data as a dictionary
        projects = user_data.get('projects', [])

        # Find the project by name
        project = next((proj for proj in projects if proj['name'] == project_name), None)

        if project is None:
            return jsonify({"error": "Project not found"}), 404

        # Find the user in the project
        for user in project.get('Users', []):
            if user.get('username') == username:
                # Update the tasks for the user
                user['tasks'] = task_data
                break
        else:
            return jsonify({"error": "User not found in the project"}), 404

        # Save the updated user data
        write_users(user_data)  # Assuming it writes the updated data back to storage

        return jsonify({"message": "Tasks updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/fetch_data', methods=['POST'])
def get_projects():
    try:
        print('Fetching user projects...')
        data = request.json
        print(data)
        user_name = data.get('user_name')  # Getting user_name from the request body
        
        if not user_name:
            return jsonify({"error": "User name is required!"}), 400
        print(f"Fetching projects for user: {user_name}")

        # Read user data
        user_data = read_users()

        projects = user_data.get('projects', [])
        user_projects = []
        # print(projects)
        # Iterate through projects to find the ones that the user is assigned to or is the admin
        for project in projects:
            # print(project)
            print('line 292',project["admin"])
            
            admin = project["admin"]  # Fetch the admin attribute
            print(f"Project: {project['name']}, Admin: {admin}")
            print(admin)
            # If the user is either assigned to the project or is the admin
            if user_name == admin:
                user_projects.append(project)

        print('appended')
        # If no projects are found for the user
        if not user_projects:
            return jsonify({"message": "No projects found for the user", "project_data": []}), 200

        return jsonify({"message": "Projects fetched successfully", "project_data": user_projects}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/fetch_manager_data', methods=['POST'])
def fetch_manager_projects():
    try:
        print('Fetching user projects...')
        data = request.json
        print(data)
        user_name = data.get('user_name')  # Getting user_name from the request body
        
        if not user_name:
            return jsonify({"error": "User name is required!"}), 400
        print(f"Fetching projects for user: {user_name}")

        # Read user data
        user_data = read_users()

        projects = user_data.get('projects', [])
        user_projects = []
        # print(projects)
        # Iterate through projects to find the ones that the user is assigned to or is the admin
        for project in projects:
            # print(project)
            print('line 292',project["Project_Manager"])
            
            admin = project["Project_Manager"]  # Fetch the admin attribute
            print(f"Project: {project['name']}, Admin: {admin}")
            print(admin)
            # If the user is either assigned to the project or is the admin
            if user_name == admin:
                user_projects.append(project)

        print('appended')
        # If no projects are found for the user
        if not user_projects:
            return jsonify({"message": "No projects found for the user", "project_data": []}), 200

        return jsonify({"message": "Projects fetched successfully", "project_data": user_projects}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500





@app.route('/fetch_tasks', methods=['POST'])
def get_user_tasks():
    try:
        print('Fetching user projects...')
        data = request.json
        print(data)
        username = data.get('username')
        if not username:
            return jsonify({"error": "Username is required!"}), 400

        print(f"Username: {username}")
        user_data = read_users()

        projects = user_data.get('projects', [])
        user_tasks = []

        for project in projects:
            # Assuming tasks for a user are stored under 'Users' key
            assigned_users = project.get('Users', [])
            print(f"Assigned users in project: {assigned_users}")

            # Check if the `Users` field is a list of dictionaries
            if any(user.get('username') == username for user in assigned_users if isinstance(user, dict)):
                user_tasks.append(project)

        print(f"User tasks: {user_tasks}")

        if not user_tasks:
            return jsonify({"message": "No tasks found for the user", "project_data": []}), 200

        return jsonify({"message": "Tasks fetched successfully", "project_data": user_tasks}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/profile', methods=['GET'])
def profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing!"}), 403

    try:
        token = token.split(" ")[1]  # Extract the token from the "Bearer <token>" format
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        username = decoded['username']
        return jsonify({"message": f"Welcome, {username}!"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired!"}), 403
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token!"}), 403


if __name__ == "__main__":
    # Check if the file exists, if not create it with initial data
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as file:
            json.dump({"users": []}, file, indent=4)
    app.run(debug=True)
