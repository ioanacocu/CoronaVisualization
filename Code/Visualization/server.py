import logging
import warnings
import gevent
from gevent import monkey, sleep
#monkey.patch_all()
from flask import Flask, request, render_template, jsonify, redirect, url_for
from flask_socketio import SocketIO, join_room
import threading
import json
from Visualization import DataAnalyzer
from Visualization.DataAnalyzer import DataAnalyzer
from pathlib import Path

import os


debug = False

# overwritten by settings from MATRXS
pageLoaded=False;
user_input = {}  # can't be None, otherwise Flask flips out when returning it
async_mode = "gevent" # gevent (preferred) or eventlet.


class AppFlask:
    def __init__(self):
        self.app, self.socketio = create_app()
        print("Creating socketio app in server.py")
        self.__fileLocation = 'Data\policies.csv'
        p = Path(self.__fileLocation).resolve()
        data, measures = DataAnalyzer.getMeasures(p)
        self.__data = data
        self.__categories = measures
        data = []
        measures = []
        @self.app.route('/init', methods=['POST'])
        def init_gui():
            """
            Routes initialisation.

            Returns
            -------
            str
                Empty response.

            """

            p = Path(self.__fileLocation).resolve()
            data, measures = DataAnalyzer.getMeasures(p)
            self.__data = data
            self.__categories = measures

            new_data ={'params': {'data': data, 'categories': measures}}

            self.socketio.emit('init', new_data, namespace="/index")

            return ""

        @self.app.route('/update', methods=['POST'])
        def update_gui():

            # Fetch data from message
            data = json.loads(request.data)
            p = Path(self.__fileLocation).resolve()
            data, measures = DataAnalyzer.getMeasures(p)
            self.__data = data
            self.__categories = measures

            new_data = {'params': {'data': data, 'categories': measures}}
            self.socketio.emit('update', new_data, namespace="/index")

            global user_input
            resp = jsonify(user_input)
            user_input = {}
            return resp

        @self.app.route('/')
        def to_dashboard():
            """ Redirect the root to the demo mode selector"""
            return redirect("/index", code=302)

        @self.app.route('/index')
        def index():
            """ screen for selecting which demo mode to use """
            return render_template('dashboard/Index.html')

        @self.socketio.on('connected', namespace='/Index')
        def connected():
            pageLoaded = True;
            p = Path(self.__fileLocation).resolve()
            data, measures = DataAnalyzer.getMeasures(p)
            countries=[c.name for c in data if len(c.measures)>1]
            activeCountries=[c for c in data if len(c.measures)>1]
            allContinents = [c.continent for c in data]
            continents=[]
            for continent in allContinents:
                if not continent in continents:
                    continents.insert(len(continents),continent)
            allMes4c=[]
            measures.sort();
            countries.sort();
            continents.sort();
            activeCountries.sort(key=lambda x: x.name)
            for country in activeCountries:
                print(len(country.measures))
                mes4c=[]
                for measure in measures:
                    if len([m for m in country.measures if m.name==measure])>0:
                        mes4c.insert(len(mes4c),([m for m in country.measures if m.name==measure][0].startDate, [m for m in country.measures if m.name==measure][0].description))
                    else:
                        mes4c.insert(len(mes4c),[('','')])
                allMes4c.insert(len(allMes4c), mes4c)
            new_data = {"countries": countries, "mes4countries":allMes4c, "categories": measures}

            filter_data={"measures":measures, "countries":countries, "continents":continents};
            self.socketio.emit('fillFilters', filter_data, namespace="/Index")
            self.socketio.emit('update', new_data, namespace="/Index")

        # Route for handling the login page logic
        @self.socketio.on('update', namespace='/Index')
        def update(data):

            selectedContinents=data[1]
            selectedCountries = data[3]
            selectedMeasures = data[5]
            measures=[m for m in self.__categories if m in selectedMeasures]
            countries = [c.name for c in self.__data if (c.continent in selectedContinents and c.name in selectedCountries and len(c.measures) > 1)]
            activeCountries = [c for c in self.__data if (c.continent in selectedContinents and c.name in selectedCountries and len(c.measures) > 1)]


            allMes4c = []
            measures.sort();
            countries.sort();
            print("menu changed",countries)
            activeCountries.sort(key=lambda x: x.name)
            for country in activeCountries:
                print(len(country.measures))
                mes4c = []
                for measure in measures:
                    if len([m for m in country.measures if m.name == measure]) > 0:
                        mes4c.insert(len(mes4c), ([m for m in country.measures if m.name == measure][0].startDate,
                                                  [m for m in country.measures if m.name == measure][0].description))
                    else:
                        mes4c.insert(len(mes4c), [('', '')])
                allMes4c.insert(len(allMes4c), mes4c)
            new_data = {"countries": countries, "mes4countries": allMes4c, "categories": measures}

            #filter_data = {"measures": measures, "countries": countries, "continents": continents};
            #self.socketio.emit('fillFilters', filter_data, namespace="/Index")
            self.socketio.emit('updateTable', new_data, namespace="/Index")

def create_app():
    app = Flask(__name__, template_folder='static/templates')
    app.config['SECRET_KEY'] = 'secret!'
    sio = SocketIO(app,async_mode=async_mode)
    return app, sio


def flaskThread(app, socket):
    try:
        socket.run(app, host='0.0.0.0', port=3000, debug=False, use_reloader=False)
    except:
        print("Server already running, skipping startup")

def run_visualisation_server():
    print("Starting background vis server")
    appFlask = AppFlask()
    thread =threading.Thread(target=flaskThread, args=(appFlask.app, appFlask.socketio,))
    thread.start()

    return

if __name__ == "__main__":
    run_visualisation_server()



