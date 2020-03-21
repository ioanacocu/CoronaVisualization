#categories
import csv
from  Visualization import DataStructure
from  Visualization.DataStructure import *

from Code.Visualization.DataStructure import Measure, Country


class DataAnalyzer:
    @staticmethod
    def getData(filename):
        data={};
        categories=[];
        with open(filename) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=';')
            line_count = 0
            for row in csv_reader:
                if line_count == 0:
                    print(f'Column names are {", ".join(row)}')
                    line_count += 1
                else:
                    if not categories.__contains__(row[0]):
                        categories.insert(0, row[0])
                    data[row[0]]=(row[1],row[2])
                    print(f'\t{row[0]} works in the {row[1]} department')
                    line_count += 1
            print(f'Processed {line_count} lines.')
            return categories, data

    @staticmethod
    def getMeasures(filename):
            data = {};
            measures=[];
            categories = [];
            countries=[];
            with open(filename) as csv_file:
                csv_reader = csv.reader(csv_file, delimiter=';')
                line_count = 0

                for row in csv_reader:
                    if line_count == 0:
                        element_no = 0;
                        for element in row:
                            if not (element.lower() == 'date' or element_no==0 or len(element)<2):
                                measures.insert(len(measures),(element, element_no))
                            element_no += 1
                        line_count += 1
                    else:
                        element_no = 0;
                        name_index=[m[1] for m in measures if m[0]==cName][0]
                        firstCaseDate_index=[m[1] for m in measures if m[0]==cFirstCaseDate][0]
                        continent_index=[m[1] for m in measures if m[0]==cContinent][0]
                        criticalNumber_index=[m[1] for m in measures if m[0]==cCriticalNumber][0]
                        measures_index=[m[1] for m in measures if not(m[0]==cCriticalNumber or m[0]==cName or m[0]==cFirstCaseDate or m[0]==cContinent)]
                        measures4Country = []
                        name = ''
                        firstCaseDate = ''
                        continent = ''
                        criticalNumber = ''
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
                                            if element_no in measures_index:
                                                measure_name=[m[0] for m in measures if m[1]==element_no][0]
                                                measure_description=element
                                                measure_start_date=row[element_no+1]
                                                cMeasure= Measure(measure_name,measure_description, measure_start_date)
                                                if(len(measure_name)>2):
                                                    measures4Country.insert(len(measures4Country), cMeasure)
                            element_no += 1


                        country=Country(name, firstCaseDate, criticalNumber, continent, measures4Country)
                        if (len(name) > 2):
                            countries.insert(len(countries), country)
                        line_count += 1
                print(f'Processed {line_count} lines.')
                return countries, [m[0] for m in measures if not(m[0]==cCriticalNumber or m[0]==cName or m[0]==cFirstCaseDate or m[0]==cContinent)]

