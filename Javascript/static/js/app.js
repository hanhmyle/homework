var tbody = d3.select("#target-table-display");
var filterButton = d3.select("#filter-btn");

data.forEach(obj => {
    var tRow = tbody.append("tr");
    Object.entries(obj).forEach(([key,value]) => {
        var tData = tRow.append("td");
        tData.text(value);
    });
});

filterButton.on("click", function() {
    tbody.html("");
    d3.event.preventDefault();
    var inputField = d3.select("#searchValue").property("value");
	var searchField = d3.select("#searchList").property("value");
	var inputTypeArray = null;
	switch(searchField) {
		case "date":
			inputTypeArray = data.filter(one => one.datetime === inputField);
			break;
		case "city":
			inputTypeArray = data.filter(one => one.city === inputField);
			break;
		case "state":
			inputTypeArray = data.filter(one => one.state === inputField);
			break;
		case "country":
			inputTypeArray = data.filter(one => one.country === inputField);
			break;
		case "shape":
			inputTypeArray = data.filter(one => one.shape === inputField);
			break;			
		default:
			inputTypeArray = data.filter(one => one.city === inputField);
			break;		
	}

    inputTypeArray.forEach((selection) => {
        var row = tbody.append("tr");
        Object.entries(selection).forEach(([key,value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });      
});

function UpdateSearchInfo(value){
	document.getElementById("searchValue").focus();
	document.getElementById("searchValue").value="";
	document.getElementById("searchValue").placeholder = `Please enter ${value}`;
}





 