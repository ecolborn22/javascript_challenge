// From data.js import
var tableData = data;

// Select the table body
var tbody = d3.select("tbody");

// Go through each row and append to the table
data.forEach((sighting) => {
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
});

// Add filtering capabilities by all fields
var filterButton = d3.select("#filter-btn");

filterButton.on("click", function(){
    // Select the input data
    var inputDate = d3.select("#datetime");
    var inputCity = d3.select("#city");
    var inputState = d3.select("#state");
    var inputCountry = d3.select("#country");
    var inputShape = d3.select("#shape");

    // Get the value property for the input field
    var dateValue = inputDate.property("value");
    var cityValue = inputCity.property("value");
    var stateValue = inputState.property("value");
    var countryValue = inputCountry.property("value");
    var shapeValue = inputShape.property("value");

    // Create an array containing the key and value
    var allValues = [
        {field: "datetime", value: dateValue},
        {field: "city",value: cityValue},
        {field: "state", value: stateValue},
        {field: "country", value: countryValue},
        {field: "shape", value: shapeValue}
    ];

    // Create mapped fields and values (has corresponding indices)
    var mappedValues = allValues.map(input => input.value);
    var mappedField = allValues.map(input => input.field);

    // Loop through mapped values find ones filled out as well as corresponding indices
    var usedValues = [];
    var usedIndices = [];
    var usedFields = [];

    for (var i = 0; i < allValues.length; i++) {
        if (mappedValues[i] != "") {
            usedIndices.push(i);
            usedValues.push(mappedValues[i]);
            usedFields.push(mappedField[i]);
        };
    };

    // Declare the data as filtered to use in iteration
    var filteredData = data;

    for (var j = 0; j < usedValues.length; j++) {
        var fieldName = usedFields[j];
        var inputValue = usedValues[j];

        if (fieldName == mappedField[0]) {
            filteredData = filteredData.filter(sighting => sighting.datetime == inputValue);
        }
        else if (fieldName == mappedField[1]) {
            filteredData = filteredData.filter(sighting => sighting.city == inputValue);
        }
        else if (fieldName == mappedField[2]) {
            filteredData = filteredData.filter(sighting => sighting.state == inputValue);
        }
        else if (fieldName == mappedField[3]) {
            filteredData = filteredData.filter(sighting => sighting.country == inputValue);
        }
        else {
            filteredData = filteredData.filter(sighting => sighting.shape == inputValue);
        };
    };

    // Clear out existing table
    tbody.html("");

    // Produce the new table based on the filter selection
    filteredData.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
    });
});