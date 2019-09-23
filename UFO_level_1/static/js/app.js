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

// Add filtering capabilities by date via button
var filterButton = d3.select("#filter-btn");

filterButton.on("click", function(){
    // Select the input element entered by the user
    let inputElement = d3.select(".form-control");

    // Get the value property for the input field
    let inputValue = inputElement.property("value");

    // Apply filters
    var filteredData = data.filter(sighting => sighting.datetime === inputValue);

    // Remove the previous table to just show the filtered results
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
