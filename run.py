from flask import Flask
import requests
import waitress
from flask import render_template, send_from_directory, request, make_response

import json

API_KEY = "939aef0ebf0cecd4d85905f7f983915d"

app = Flask(__name__,template_folder="")

#list of cities rewitten to be indexed in O(1) time
f = open("city.list.json")
cities_json = json.loads(f.read())
cities = {}

for city in cities_json:
    cities[city["id"]] = city


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
    if req.status_code == 200:
        req = req.json()
        city = cities[req["id"]]
        req["sys"]["state"] = city["state"] or None

        resp = make_response(req)
    else:
        resp = make_response({
            "cod" : req.status_code
        })

    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


waitress.serve(app, host='0.0.0.0',port=4680, url_scheme='https')
