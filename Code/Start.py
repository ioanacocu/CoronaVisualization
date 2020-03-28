
import pymongo
import time
import os
import warnings
import threading
from collections import OrderedDict

from Visualization import server
from Visualization import DataAnalyzer
from Visualization import Visualizer

url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSoU-enLc3GpVJ8sMYHCyC2g6jt_87wFNwC0DHwjES8tikVBDGNNp5l7b4YvXPD3YzUu24esi_ajhN8/pubhtml?gid=1127098673&single=true&exportFormat=csv'
output = os.path.join('Visualization', 'Data', 'policies.csv')
import requests
import pandas as pd
csv_content = requests.get(url)

html = requests.get(url).content
df_list = pd.read_html(html)
df = df_list[-1]

df.to_csv(output)

url2='https://www.ecdc.europa.eu/sites/default/files/documents/COVID-19-geographic-disbtribution-worldwide-2020-03-23.xlsx'
read_file = pd.read_excel (r'https://www.ecdc.europa.eu/sites/default/files/documents/COVID-19-geographic-disbtribution-worldwide-2020-03-23.xlsx')
read_file.to_csv (os.path.join('Visualization', 'Data', 'time_series.csv'), index = None, header=True)

time.sleep(20)
started_visualization=server.run_visualisation_server()
__visualizer = Visualizer.Visualizer(server_running = True)

