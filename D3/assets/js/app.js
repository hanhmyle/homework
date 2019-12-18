var svgWidth = 960;
var svgHeight = 620;

var margin = {
    top: 20,
    right: 40,
    bottom: 200,
    left: 100
};

var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bottom;

var chart = d3.select("#scatter").append("div").classed("chart", true);

var svg = chart.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

function xScale(data, xAxis) {
    //create scales
    return d3.scaleLinear()
        .domain([d3.min(data, d => d[xAxis]) * 0.8,
            d3.max(data, d => d[xAxis]) * 1.2])
        .range([0, width]);
}

function yScale(data, yAxis) {
    return d3.scaleLinear()
        .domain([d3.min(data, d => d[yAxis]) * 0.8,
            d3.max(data, d => d[yAxis]) * 1.2])
        .range([height, 0]);
}

function renderAxesX(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
}
function renderAxesY(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", data => newXScale(data[chosenXAxis]))
        .attr("cy", data => newYScale(data[chosenYAxis]));

    return circlesGroup;
}
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    textGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]))
        .attr("y", d => newYScale(d[chosenYAxis]));

    return textGroup;
}
function styleX(value, chosenXAxis) {
	switch(chosenXAxis){
	case 'poverty':
		return `${value}%`;
		break;
	case 'income':
		return `$${value}`;
		break;
	default:
		return `${value}`;
		break;		
	}
}
function toolTip(chosenXAxis, chosenYAxis, circlesGroup) {
	var xLabel = null;
	var yLabel = null;
	
	switch(chosenXAxis){
	case 'poverty':
		xLabel = "Poverty:";
		break;
	case 'income':
		xLabel = "Median Income:";
		break;

	default:
		xLabel = "Age:";
		break;
    }

	switch(chosenYAxis){
	case 'healthcare':
		yLabel = "No Healthcare:";
		break;
	case 'obesity':
		yLabel = "Obesity:";
		break;

	default:
		yLabel = "Smokers:";
		break;
    }

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) {
            return (`${d.state}<br>${xLabel} ${styleX(d[chosenXAxis], chosenXAxis)}<br>${yLabel} ${d[chosenYAxis]}%`);
        });

    circlesGroup.call(toolTip);
    circlesGroup.on("mouseover", toolTip.show)
    .on("mouseout", toolTip.hide);

    return circlesGroup;
}

d3.csv("./assets/data/data.csv").then(function(sourceData) {
    //parse data
    sourceData.forEach(function(data) {data.obesity = +data.obesity;data.income = +data.income;data.smokes = +data.smokes;data.age = +data.age;
	data.healthcare = +data.healthcare; data.poverty = +data.poverty;
    });

    var xLinearScale = xScale(sourceData, chosenXAxis);
    var yLinearScale = yScale(sourceData, chosenYAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(sourceData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 12)
        .attr("opacity", ".5");

    var textGroup = chartGroup.selectAll(".stateText").data(sourceData).enter().append("text").classed("stateText", true)
        .attr("x", d => xLinearScale(d[chosenXAxis])).attr("y", d => yLinearScale(d[chosenYAxis])).attr("dy", 3).attr("font-size", "10px").text(function(d){return d.abbr});

    var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20 + margin.top})`);

    var povertyLabel = xLabelsGroup.append("text")
        .classed("aText", true).classed("active", true).attr("x", 0).attr("y", 20).attr("value", "poverty").text("In Poverty (%)");

    var ageLabel = xLabelsGroup.append("text").classed("aText", true).classed("inactive", true).attr("x", 0).attr("y", 40).attr("value", "age").text("Age (Median)")

    var incomeLabel = xLabelsGroup.append("text").classed("aText", true).classed("inactive", true).attr("x", 0)
        .attr("y", 60).attr("value", "income").text("Household Income (Median)")

    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${0 - margin.left/4}, ${(height/2)})`);

    var healthcareLabel = yLabelsGroup.append("text").classed("aText", true).classed("active", true).attr("x", 0).attr("y", 0 - 20)
        .attr("dy", "1em").attr("transform", "rotate(-90)").attr("value", "healthcare").text("Lacks Healthcare (%)");

    var smokesLabel = yLabelsGroup.append("text").classed("aText", true).classed("inactive", true).attr("x", 0).attr("y", 0 - 40).attr("dy", "1em")
        .attr("transform", "rotate(-90)").attr("value", "smokes").text("Smokes (%)");

    var obesityLabel = yLabelsGroup.append("text").classed("aText", true).classed("inactive", true).attr("x", 0).attr("y", 0 - 60).attr("dy", "1em")
        .attr("transform", "rotate(-90)").attr("value", "obesity").text("Obese (%)");

    var circlesGroup = toolTip(chosenXAxis, chosenYAxis, circlesGroup);

    xLabelsGroup.selectAll("text")
        .on("click", function() {
            var value = d3.select(this).attr("value");

            if (value != chosenXAxis) {

                chosenXAxis = value;
                xLinearScale = xScale(sourceData, chosenXAxis);
                xAxis = renderAxesX(xLinearScale, xAxis);
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
                textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
                circlesGroup = toolTip(chosenXAxis, chosenYAxis, circlesGroup);

				povertyLabel.classed("active", chosenXAxis === "poverty"? true: false).classed("inactive", chosenXAxis === "poverty"? false: true);
				ageLabel.classed("active", chosenXAxis === "poverty"? false: true).classed("inactive", chosenXAxis === "poverty"? true: false);
				incomeLabel.classed("active", chosenXAxis === "poverty"? false: true).classed("inactive", chosenXAxis === "poverty"? true: false);
            }
        });

    yLabelsGroup.selectAll("text")
    .on("click", function() {
        var value = d3.select(this).attr("value");
        if (value != chosenYAxis) {
            chosenYAxis = value;            
            yLinearScale = yScale(sourceData, chosenYAxis);            
            yAxis = renderAxesY(yLinearScale, yAxis);            
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
            textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)

            circlesGroup = toolTip(chosenXAxis, chosenYAxis, circlesGroup);
            obesityLabel.classed("active", chosenYAxis === "obesity"? true: false).classed("inactive", chosenYAxis === "obesity"? false: true);
			smokesLabel.classed("active", chosenYAxis === "obesity"? false: true).classed("inactive", chosenYAxis === "obesity"? true: false);
			healthcareLabel.classed("active", chosenYAxis === "obesity"? false: true).classed("inactive", chosenYAxis === "obesity"? true: false);
        }
    });
    


    
});




