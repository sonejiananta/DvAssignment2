
function getSelected1(){
	var a = document.getElementById("m1").value;
	var words = a.trim().split(" : ");
	var metaData = words[0].split(" , ");
	var player = words[1].split(" vs ");
	m_year = metaData[0];
	m_round = metaData[1];
	m_player1 = player[0];
	m_player2 = player[1];


	var height = 100;
	var width = 800;
	var canvas0 = d3.select('#canvas').append('svg')    
	    .attr('width', width)
	    .attr('height', height);
	

	var canvas1 = d3.select('#canvas').append('svg')    
	    .attr('width', width)
	    .attr('height', height);

	var canvas2 = d3.select('#canvas').append('svg')    
	    .attr('width', width)
	    .attr('height', height);

	var canvas3 = d3.select('#canvas').append('svg')    
	    .attr('width', width)
	    .attr('height', height);

	var canvas4 = d3.select('#canvas').append('svg')    
	    .attr('width', width)
	    .attr('height', height);

	var rect1 = canvas1.append('rect')    
	    .attr('width', width)
	    .attr('height', height)
	    .style('fill','pink');

	var rect2 = canvas2.append('rect')    
	    .attr('width', width)
	    .attr('height', height)
	    .style('fill','pink');
 	
  	d3.csv("10yearAUSOpenMatches.csv", function(error, data) {
	    data.forEach(function(d){
	    	
	    	if(d.year == m_year && (d.round).toUpperCase() == m_round && (d.player1).toUpperCase() == m_player1 && (d.player2).toUpperCase() == m_player2 )
	    	{
	    		
	    		var p1 = canvas0.append('text').text(d.player2).attr("x", 120).attr("y", 50).style("fill", "darkorange")
	    				.style("font-family", "sans-serif")
	    				.style("font-size", "25px");
				var p1 = canvas0.append('text').text(d.player1).attr("x", 530).attr("y", 50).style("fill", "steelblue")
						.style("font-family", "sans-serif")
	    				.style("font-size", "25px");

	    		
	    		var max_ace = (Math.floor(Math.max(d.ace1,d.ace2)/10)+1)*10;

	    		var max_double = (Math.floor(Math.max(d.double1,d.double2)/10)+1)*10;


	    		var min_ace = 0-max_ace;
	    		var min_double = 0-max_double;

	    		var DATA = [
	    		{
	    			"name": "Ace1",
	    			"ace_value": d.ace1,
	    			"double_value": d.double1
	    		},
	    		{
	    			"name": "Ace2",
	    			"ace_value": 0-d.ace2,
	    			"double_value" : 0-d.double2,
	    		}];
	    		var x_ace = d3.scale.linear()
	    			.domain([min_ace, max_ace])
	    			.range([0,width]);
	    		
	    		var x_double = d3.scale.linear()
	    			.domain([min_double, max_double])
	    			.range([0,width]);

	    		var y = d3.scale.ordinal()
				    .domain(DATA.map(function(d) { return d.name; }))
				    .rangeRoundBands([0, height], 0.1);

				var xAxis_ace = d3.svg.axis()
				    .scale(x_ace)
				    .orient("bottom");

				var xAxis_double = d3.svg.axis()
				    .scale(x_double)
				    .orient("bottom");
				
				// var yAxis = d3.svg.axis()
				//     .scale(y)
				//     .orient("left");
				
				
			    console.log("added axis");

			    document.getElementById("text1").innerHTML += "<br><br><br><br><br><br><h2>Ace</h2><br><br><h2>Double</h2>";

			    document.getElementById("text2").innerHTML += "<br><br><br><br><br><br><h2>Ace</h2><br><br><h2>Double</h2>"

			    var bars1 = canvas1.selectAll(".bar")
				    	.data(DATA)
				    .enter().append("rect")
				    	.attr("class", function(d){ return "bar b--" + (d.value < 0 ? "negative" : "positive");})
				    	.attr("x", function(d){ return x_ace(Math.min(0, d.ace_value));})
				    	.attr("y", function(d){ return y(d.name);})
				    	.attr("width", function(d){ return Math.abs(x_ace(d.ace_value) - x_ace(0)); })
				    	.attr("height", y.rangeBand())
				    	.style("fill", function(d){ if(d.name=="Ace1") return "steelblue"; else return "darkorange";})
				   
				
				var text1 = canvas1.selectAll("text")
						.data(DATA)
					.enter().append("text")
						.text(function(d){  if(d.ace_value < 0) 
												return Math.abs(d.ace_value); 
											else if(d.ace_value ==0) return "";
											else return d.ace_value;
										})
						.attr("x", function(d){ return x_ace(d.ace_value);})
						.attr("y", function(d){ return y(d.name) ;})
						.attr("dy", "1.5em")
						.attr("dx", function(d){ if(d.ace_value > 0)
													return "-1.25em";
												else return ".35em";
							})
						.attr("font-family", "sans-serif")
						.attr("font-size", "20px")
						.style("fill", "white");
				


			    // canvas1.append("g")
			    //   .attr("class", "x axis1")
			    //   .call(xAxis_ace);

			  	// canvas1.append("g")
			   //    .attr("class", "y axis1")
			   //    .call(yAxis);


			   var bars2 = canvas2.selectAll(".bar")
				    	.data(DATA)
				    .enter().append("rect")
				    	.attr("class", function(d){ return "bar b--" + (d.value < 0 ? "negative" : "positive");})
				    	.attr("x", function(d){ return x_double(Math.min(0, d.double_value));})
				    	.attr("y", function(d){ return y(d.name);})
				    	.attr("width", function(d){ return Math.abs(x_double(d.double_value) - x_double(0)); })
				    	.attr("height", y.rangeBand())
				    	.style("fill", function(d){ if(d.name=="Ace1") return "steelblue"; else return "darkorange";});
				    	
			 var text2 = canvas2.selectAll("text")
						.data(DATA)
					.enter().append("text")
						.text(function(d){  if(d.double_value < 0) 
												return Math.abs(d.double_value); 
											else if(d.double_value ==0) return "";
											else return d.double_value;
										})
						.attr("x", function(d){ return x_double(d.double_value);})
						.attr("y", function(d){ return y(d.name) ;})
						.attr("dy", "1.5em")
						.attr("dx", function(d){ if(d.double_value > 0)
													return "-1.25em";
												else return ".35em";
							})
						.attr("font-family", "sans-serif")
						.attr("font-size", "20px")
						.style("fill", "white");


			   




	    	}

	    })



	  });
  	
}