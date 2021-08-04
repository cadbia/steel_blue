from flask import Flask
import requests
import waitress
from flask import render_template, send_from_directory, request

API_KEY = "939aef0ebf0cecd4d85905f7f983915d"

app = Flask(__name__,template_folder="")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/<path:path>")
def root_path(path):
    return send_from_directory(".",path)

@app.route("/src/<path:path>")
def staticpath(path):
    return send_from_directory("src",path)


@app.route("/api/<path:endpoint>")
def api(endpoint):

    arg_list = ""

    for arg in request.args:
        arg_list += f"{arg}={request.args.get(arg)}&"

    req = requests.get(f"https://api.openweathermap.org/data/2.5/{endpoint}?{arg_list}appid={API_KEY}")
    return req.json()


waitress.serve(app, listen='*:4682')