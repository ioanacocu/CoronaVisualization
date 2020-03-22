function PopulateFilters(data) {
    continents=data['continents']
    contLength=data['continents'].length
    countries=data['countries']
    cLength=data['countries'].length
    measures=data['measures']
    mLength=data['measures'].length
    i=0;
    var measuresDiv = document.getElementById("Measures");
    linebreak = document.createElement("br");
    measuresDiv.appendChild(linebreak);
    for (i;i<mLength;i++){
         var checkbox = document.createElement('input')
         checkbox.type = "checkbox";
            checkbox.name = measures[i]
            checkbox.value = measures[i];
            checkbox.id = measures[i];
            var label = document.createElement('label');

            // assigning attributes for
            // the created label tag
            label.htmlFor = measures[i];

            // appending the created text to
            // the created label tag
            label.appendChild(document.createTextNode(measures[i]));

            // appending the checkbox
            // and label to div
            measuresDiv.appendChild(checkbox);
            measuresDiv.appendChild(label);
            linebreak = document.createElement("br");
            measuresDiv.appendChild(linebreak);
}


    var countriesDiv = document.getElementById("Countries");
    linebreak = document.createElement("br");
    countriesDiv.appendChild(linebreak);
    i=0;
    for (i;i<cLength;i++){
         var checkbox = document.createElement('input')
         checkbox.type = "checkbox";
            checkbox.name = countries[i]
            checkbox.value = countries[i];
            checkbox.id = countries[i];
            var label = document.createElement('label');
            // assigning attributes for
            // the created label tag
            label.htmlFor = countries[i];

            // appending the created text to
            // the created label tag
            label.appendChild(document.createTextNode(countries[i]));

            // appending the checkbox
            // and label to div
            countriesDiv.appendChild(checkbox);
            countriesDiv.appendChild(label);
            linebreak = document.createElement("br");
            countriesDiv.appendChild(linebreak);
}

    var continentsDiv = document.getElementById("Continents");
    linebreak = document.createElement("br");
    continentsDiv.appendChild(linebreak);
    i=0;
    for (i;i<contLength;i++){
         var checkbox = document.createElement('input')
         checkbox.type = "checkbox";
         checkbox.name = continents[i]
         checkbox.value = continents[i];
         checkbox.id = continents[i];
         var label = document.createElement('label');
            // assigning attributes for
            // the created label tag
         label.htmlFor = continents[i];

            // appending the created text to
            // the created label tag
         label.appendChild(document.createTextNode(continents[i]));

            // appending the checkbox
            // and label to div
         continentsDiv.appendChild(checkbox);
         continentsDiv.appendChild(label);
         linebreak = document.createElement("br");
         continentsDiv.appendChild(linebreak);
}
        }