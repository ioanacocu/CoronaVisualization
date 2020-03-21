
import pymongo
import datetime
import time
import os.path
import warnings
import threading
from collections import OrderedDict

from Visualization import server
from Visualization import DataAnalyzer
from Visualization import Visualizer


started_visualization=server.run_visualisation_server()
__visualizer = Visualizer.Visualizer(server_running = True)
#current_nr_ticks=1000;
#__visualizer._update_guis(tick=current_nr_ticks)

