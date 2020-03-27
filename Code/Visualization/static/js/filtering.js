selectedContinents=[]
selectedCountries=[]
selectedMeasures=[]
socket=''
function PopulateFilters(data, s) {
    socket=s
    continents=data['continents']
    contLength=data['continents'].length
    countries=data['countries']
    cLength=data['countries'].length

    i=0;
    showableCountries=[]
    uniqueIndexes=[]
    for (i;i<cLength;i++){
        if(uniqueIndexes.includes(countries[i][1])) {
            j=0
            for (j;j<showableCountries.length;j++){
                if (showableCountries[j][1]==countries[i][1]){showableCountries[j][0]=countries[i][1]}
            }
            }
            else {
            showableCountries.push(countries[i])
            uniqueIndexes.push(countries[i][1])
            }

        }

    countries=showableCountries
    cLength=countries.length

    measures=data['measures']
    mLength=data['measures'].length
    i=0;
    var measuresDiv = document.getElementById("Measures");
    while (measuresDiv.firstChild) {
        measuresDiv.removeChild(measuresDiv.lastChild);
    }
    linebreak = document.createElement("br");
    measuresDiv.appendChild(linebreak);
    for (i;i<mLength;i++){
         var checkbox = document.createElement('input')
         checkbox.type = "checkbox";
         checkbox.name = measures[i]
         checkbox.value = measures[i];
         checkbox.id = measures[i].replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
         var label = document.createElement('label');
         label.htmlFor = measures[i];
         label.appendChild(document.createTextNode(measures[i]));
         checkbox.addEventListener( 'click', function() {modifyMeasures(this.id, socket)});
         measuresDiv.appendChild(checkbox);
         measuresDiv.appendChild(label);
         linebreak = document.createElement("br");
         measuresDiv.appendChild(linebreak);
}


    var countriesDiv = document.getElementById("Countries");
    while (countriesDiv.firstChild) {
        countriesDiv.removeChild(countriesDiv.lastChild);
    }
    linebreak = document.createElement("br");
    countriesDiv.appendChild(linebreak);
    i=0;
    for (i;i<cLength;i++){
         var checkbox = document.createElement('input')
         checkbox.type = "checkbox";
            checkbox.name = countries[i][1]
            checkbox.value = countries[i][1];
            checkbox.id = countries[i][1];
            var label = document.createElement('label');
            label.htmlFor = countries[i][1];
            label.appendChild(document.createTextNode(countries[i][0]));
            checkbox.addEventListener( 'click', function() {modifyCountries(this.id,socket)});
            countriesDiv.appendChild(checkbox);
            countriesDiv.appendChild(label);
            linebreak = document.createElement("br");
            countriesDiv.appendChild(linebreak);
}

    var continentsDiv = document.getElementById("Continents");
    while (continentsDiv.firstChild) {
        continentsDiv.removeChild(continentsDiv.lastChild);
    }
    linebreak = document.createElement("br");
    continentsDiv.appendChild(linebreak);
    i=0;
    for (i;i<contLength;i++){
         var checkbox = document.createElement('input')
         checkbox.type = "checkbox";
         checkbox.name = continents[i]
         checkbox.value = continents[i];
         checkbox.id = continents[i].replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')
         var label = document.createElement('label');
         label.htmlFor = continents[i];
         label.appendChild(document.createTextNode(continents[i]));
         checkbox.addEventListener( 'click', function() {modifyContinents(this.id, socket)});
         continentsDiv.appendChild(checkbox);
         continentsDiv.appendChild(label);
         linebreak = document.createElement("br");
         continentsDiv.appendChild(linebreak);
}
        }

function modifyContinents(id){
    el=$('#'+id)

    if(el[0].checked) {
        selectedContinents.push(el[0].value)
    } else {
        selectedContinents = selectedContinents.filter(function(item) {
        return item !== el[0].value  })
    }
    socket.emit('update', ["continents", selectedContinents, "countries", selectedCountries, "measures", selectedMeasures]);
    }

function modifyCountries(id){
    el=$('#'+id)

    if(el[0].checked) {
        selectedCountries.push(el[0].value)
    } else {
        selectedCountries = selectedCountries.filter(function(item) {
        return item !== el[0].value  })
    }
    socket.emit('update', ["continents", selectedContinents, "countries", selectedCountries, "measures", selectedMeasures]);}

function modifyMeasures(id){
    el=$('#'+id)
    socket.emit('update', continents);
    if(el[0].checked) {
        selectedMeasures.push(el[0].value)
    } else {
        selectedMeasures = selectedMeasures.filter(function(item) {
        return item !== el[0].value  })
    }
    socket.emit('update', ["continents", selectedContinents, "countries", selectedCountries, "measures", selectedMeasures]);
    }