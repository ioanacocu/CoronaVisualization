#categories
import csv
from  Visualization import DataStructure
from  Visualization.DataStructure import *

from Code.Visualization.DataStructure import Measure, Country


class DataAnalyzer:
    @staticmethod
    def getData(filenamePolicy):
        data={};
        categories=[];
        with open(filenamePolicy) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            line_count = 0
            for row in csv_reader:
                if line_count == 7:
                    line_count += 1
                else:
                    if line_count > 7:
                        if not categories.__contains__(row[0]):
                            categories.insert(0, row[0])
                        data[row[0]]=(row[1],row[2])

                    line_count += 1
            print(f'Processed {line_count} lines.')
            return categories, data

    @staticmethod
    def getMeasures(filenamePolicy):
            data = {};
            measures=[];
            categories = [];
            countries=[];
            with open(filenamePolicy) as csv_file:
                csv_reader = csv.reader(csv_file, delimiter=',')
                line_count = 0
                for row in csv_reader:
                    if line_count == 7:
                        element_no = 0;
                        for element in row:
                            if not (element.lower() == 'date' or element_no==0 or len(element)<4):
                                measures.insert(len(measures),(element, element_no))
                            element_no += 1
                        line_count += 1
                    else:
                        if line_count > 7:
                            element_no = 0;
                            name_index=[m[1] for m in measures if m[0]==cName][0]
                            firstCaseDate_index=[m[1] for m in measures if m[0]==cFirstCaseDate][0]
                            continent_index=[m[1] for m in measures if m[0]==cContinent][0]
                            criticalNumber_index=[m[1] for m in measures if m[0]==cCriticalNumber][0]
                            countryCode_index = [m[1] for m in measures if m[0] == cCountryCode][0]
                            measures_index=[m[1] for m in measures if not(m[0]==cCriticalNumber or m[0]==cName or m[0]==cFirstCaseDate or m[0]==cContinent)]
                            measures4Country = []
                            name = ''
                            firstCaseDate = ''
                            continent = ''
                            criticalNumber = ''
                            geoId=''
                            for element in row:
                                if element_no==name_index:
                                    name=element
                                else:
                                    if element_no==firstCaseDate_index:
                                        firstCaseDate=element
                                    else:
                                        if element_no == continent_index:
                                            continent = element
                                        else:
                                            if element_no == criticalNumber_index:
                                                criticalNumber = element
                                            else:
                                                if element_no == countryCode_index:
                                                    geoId = element
                                                else:
                                                    if element_no in measures_index:
                                                        measure_name=[m[0] for m in measures if m[1]==element_no][0]
                                                        measure_description=element
                                                        measure_start_date=row[element_no+1]
                                                        cMeasure= Measure(measure_name,measure_description, measure_start_date)
                                                        if(len(measure_name)>2):
                                                            measures4Country.insert(len(measures4Country), cMeasure)
                                element_no += 1

                            if len(name)>2:
                                country=Country(name, firstCaseDate, criticalNumber, continent, measures4Country, geoId)
                                countries.insert(len(countries), country)
                        line_count += 1
                print(f'Processed {line_count} lines.')
                return countries, [m[0] for m in measures if not(m[0]==cCriticalNumber or m[0]==cName or m[0]==cFirstCaseDate or m[0]==cContinent or m[0]==cCountryCode)]

    @staticmethod
    def getTimeSeries(filenameTimeseries):
        timeSeries = {};
        indexes=[]
        countries = [];
        with open(filenameTimeseries) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            line_count = 0
            for row in csv_reader:
                if line_count == 0:
                    element_no = 0;
                    for element in row:
                        if not (len(element) < 2):
                            indexes.insert(len(indexes), (element, element_no))
                        element_no += 1
                    line_count += 1
                else:
                    if line_count > 0:
                        element_no = 0;
                        country_index = [m[1] for m in indexes if m[0] == tCountry][0]
                        cases_index = [m[1] for m in indexes if m[0] == tCases][0]
                        deaths_index = [m[1] for m in indexes if m[0] == tDeaths][0]
                        year_index= [m[1] for m in indexes if m[0] == tYear][0]
                        month_index=[m[1] for m in indexes if m[0] == tMonth][0]
                        day_index=[m[1] for m in indexes if m[0] == tDay][0]
                        geoId_index=[m[1] for m in indexes if m[0] == tCountryCode][0]
                        country=''
                        cases=0
                        deaths=0
                        year=2019
                        month=0
                        day=1
                        geoId=''
                        for element in row:
                            if element_no == country_index:
                                country = element
                            else:
                                if element_no == cases_index:
                                    cases = element
                                else:
                                    if element_no == deaths_index:
                                        deaths = element
                                    else:
                                        if element_no == year_index:
                                            year = element
                                        else:
                                            if element_no == month_index:
                                                month = element
                                            else:
                                                if element_no == day_index:
                                                    day = element
                                                else:
                                                    if element_no == geoId_index:
                                                        geoId = element

                            element_no += 1
                        if geoId not in timeSeries.keys():
                            timeSeries[geoId] = {}
                        if country not in timeSeries[geoId].keys():
                            timeSeries[geoId][country]={}
                        if year not in timeSeries[geoId][country].keys():
                            timeSeries[geoId][country][year]={}
                        if month not in timeSeries[geoId][country][year].keys():
                            timeSeries[geoId][country][year][month]={}
                        timeSeries[geoId][country][year][month][day]=(cases, deaths)

                    line_count += 1
            return timeSeries


