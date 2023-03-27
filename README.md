# Getting Started with FoodGrab

This project was created through ReactJS and Django.

## Installation for Django (Python 3.8.9)

Step 1: Install Virtual Environment Package through "pip install virtualenvwrapper"<br/>
Step 2: Make a new virtual environment with these two commands "source /usr/local/bin/virtualenvwrapper.sh" & "mkvirtualenv -p /usr/bin/python3 fyp_env"<br/> 
Step 3: Ensure that you have activated the virtual env through "workon fyp_env"<br/>
Step 4: Change directory to the "fyp" folder and perform "pip install -r requirements.txt"<br/>

## Installation for ReactJS

Step 1: Change directory to the foodgrab project root folder.<br/>
Step 2: Install all the packages through "npm install"

## Installation for Redis Server
Ensure you are using your computer's Terminal or Command Prompt

For Ubuntu:<br/>
sudo apt-get update<br/>
sudo install redis-server

For Windows:<br/>
Install WSL2<br/>
Follow the instructions through this link provided.<br/>
https://redis.io/docs/getting-started/installation/install-redis-on-windows/

For MacOS:<br/>
brew install redis

## Running the Application

Step 1: Change directory to the "fyp" folder and start the Django API server through "redis-server & python3 manage.py runserver 127.0.0.1:8000"<br/>
Step 2: In a separate terminal, change directory to the root of the project folder and start the application through "npm start".<br/>
