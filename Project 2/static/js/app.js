function ShowGraph1(value){
	var yType=value;
	var xType=document.getElementById("loanTypeDropDown").value
	if (xType){
		ShowGraph(xType,yType)
	}
}

function ShowGraph(value, outputType){
	var url;
	switch(value) {
	  case "age":
		url = outputType == "borrower" ? "/byage": "/byageb";
		break;
	  case "size":
		url = outputType == "borrower" ? "/bysize" : "/bysizeb";		
		break;
	  case "location":
		url = outputType == "borrower" ? "/bylocation" : "/bylocationb";
		//getLocationChart(url);
		break;
	}
	getChart(url, value);
		
};
function getChart(url, chartType){
	d3.json(url).then(function(response){
		console.log(url); 
		var data = chartType=="location" ? [response]: response;
		var layout =chartType=="age" ? {barmode: 'group'} : null;

		Plotly.newPlot('plot', data, layout);	
		
		var loanType = document.getElementById("loanTypeDropDown").options[document.getElementById("loanTypeDropDown").selectedIndex].text;
		var outputType = document.getElementById("outputType").options[document.getElementById("outputType").selectedIndex].text;
		
		document.getElementById("chartResult").innerHTML = `Chart Result for ${loanType} and ${outputType}`;

	});		
}

function init() {
  // Grab a reference to the dropdown select element
  var yType = document.getElementById("outputType").value
  console.log(yType)  
}

// Initialize the dashboard
init();