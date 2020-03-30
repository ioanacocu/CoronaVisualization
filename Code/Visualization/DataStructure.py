cName='Countries'
cContinent='Continent'
cFirstCaseDate='First case(s) confirmed'
cCriticalNumber='By case nb'
cCountryCode='Country Code'
tCountry='countriesAndTerritories'
tCases='cases'
tDeaths='deaths'
tDay='day'
tMonth='month'
tYear='year'
tCountryCode='countryterritoryCode'
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
    def __init__(self, name, firstCaseDate, continent, measures, geoID):
        self.name = name
        self.firstCaseDate = firstCaseDate
        self.measures = measures
        self.continent = continent
        self.geoID=geoID

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True)


