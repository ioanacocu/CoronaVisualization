import requests
import datetime
import sys
import os.path
import json
import csv
import requests
import os
from pathlib import Path
from Visualization.DataAnalyzer import DataAnalyzer

class Visualizer:
    """
    """

    def __init__(self, server_running=False):
        self.__fileLocation = Path("../Visualization/Data/policies.csv")
        p = Path(self.__fileLocation).resolve()
        data, measures = DataAnalyzer.getMeasures(p)

        self.__server_running = server_running

        #data = {'data': data, 'categories': measures}
        self.__initGUI(data=data, categories=measures)

    def __initGUI(self, data, categories):
        """
        Send an initialization message to the GUI webserver, which sends the grid_size.
        """
        # If the server is not running, we skip visualisation.
        if not self.__server_running:
            return

        data = {'data':data, 'categories':categories}

        url = 'http://localhost:3000/index'

        tick_start_time = datetime.datetime.now()

        # send an update of the agent state to the GUI via its API

        tick_end_time = datetime.datetime.now()
        tick_duration = tick_end_time - tick_start_time


    def _update_guis(self, tick):
        """
        Update the (human)agent and god views, by sending the updated filtered
        state of each to the Visualizer webserver which will update the
        visualizations.
        """
        self.tick = tick
        # send the update to the webserver
        self.__send_gui_update()

    def __send_gui_update(self):
        """
        Send the states of all (human)agents and god to the webserver for updating of the GUI
        """
        # If the server is not running, we skip visualisation.
        if not self.__server_running:
            return

        # put data in a json array
        p = Path(self.__fileLocation).resolve()
        data, measures= DataAnalyzer.getMeasures(p)
        data = {'data':data, 'categories':measures}
        url = 'http://localhost:3000/update'
        tick_start_time = datetime.datetime.now()

        # send an update of the agent state to the GUI via its API
        try:
            r = requests.post(url, json=data)
        except requests.exceptions.ConnectionError:
            self.__server_running = False  # If connection fails, we stop trying it again
            raise requests.exceptions.ConnectionError("Connection error; the visualisation server is likely not "
                                                      "running or has crashed. Please start this first by running /visualisation/"
                                                      "server.py")

        tick_end_time = datetime.datetime.now()
        tick_duration = tick_end_time - tick_start_time

