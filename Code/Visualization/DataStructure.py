cName='Countries'
cContinent='Continent'
cFirstCaseDate='First case(s) confirmed'
cCriticalNumber='By case nb'
cCountryCode='Country Code'
tCountry='Countries and territories'
tCases='Cases'
tDeaths='Deaths'
tDay='Day'
tMonth='Month'
tYear='Year'
tCountryCode='GeoId'
import country_converter as coco

import json
class Measure:
    def __init__(self, name, description, startDate):
        self.name = name
        self.description = description
        self.startDate = startDate

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                            sort_keys=True)

class Country:
    def __init__(self, name, firstCaseDate, criticalNumber, continent, measures, geoID):
        self.name = name
        self.firstCaseDate = firstCaseDate
        self.criticalNumber = criticalNumber
        self.measures = measures
        self.continent = continent
        self.geoID=coco.convert(names=geoID , to='ISO2')

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True)


