
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
	
	var rect0 = canvas0.append('rect')    
	    .attr('width', width)
	    .attr('height', height)
	    .style('fill','#ffffb3');

	canvas0.append('line')
		.attr('x1','400')
		.attr('y1','0')
		.attr('x2','400')
		.attr('y2','100')
		.style('stroke', '#e6e600');
	
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
	    .style('fill','#f2f2f2');

	var rect2 = canvas2.append('rect')    
	    .attr('width', width)
	    .attr('height', height)
	    .style('fill','#f2f2f2');

	var rect3 = canvas3.append('rect')    
	    .attr('width', width)
	    .attr('height', height)
	    .style('fill','#f2f2f2');

	var rect4 = canvas4.append('rect')    
	    .attr('width', width)
	    .attr('height', height)
	    .style('fill','#f2f2f2');
 	
  	d3.csv("10yearAUSOpenMatches.csv", function(error, data) {
	    data.forEach(function(d){
	    	
	    	
	    	if(d.year == m_year && (d.round).toUpperCase() == m_round && (d.player1).toUpperCase() == m_player1 && (d.player2).toUpperCase() == m_player2 )
	    	{
	    		
	    		var p1 = canvas0.append('text').text(d.player2).attr("x", 120).attr("y", 30).style("fill", "#ff6600")
	    				.style("font-family", "impact")
	    				.style("font-size", "25px");

				var c1 = canvas0.append('text').text("( " + d.country1 + " )").attr("x", 180).attr("y", 60).style("fill", "#ff6600")
	    				.style("font-family", "impact")
	    				.style("font-size", "25px");

	    		var w1 = canvas0.append('text').text("Runner-Up").attr("x", 173).attr("y", 90).style("fill", "#ff6600")
	    				.style("font-family", "georgia")
	    				.style("font-size", "15px");
	    		
				var p1 = canvas0.append('text').text(d.player1).attr("x", 510).attr("y", 30).style("fill", "#000099")
						.style("font-family", "impact")
	    				.style("font-size", "25px");

	    		var c2 = canvas0.append('text').text("( " + d.country2 + " )").attr("x", 570).attr("y", 60).style("fill", "#000099")
	    				.style("font-family", "impact")
	    				.style("font-size", "25px");
	    		
	    		var w2 = canvas0.append('text').text("Winner").attr("x", 579).attr("y", 90).style("fill", "#000099")
	    				.style("font-family", "geogia")
	    				.style("font-size", "15px");
	    		
	    		var max_ace = (Math.floor(Math.max(d.ace1,d.ace2)/10)+1)*10;

	    		var max_double = (Math.floor(Math.max(d.double1,d.double2)/10)+1)*10;


	    		var min_ace = 0-max_ace;
	    		var min_double = 0-max_double;

	    		var tip = d3.tip()
					  .attr('class', 'd3-tip')
					  .offset([-10, 0])
					  .html("<strong>Year:</strong> <span style='color:red'>" + " " + d.year + "</span><br><strong>Round:</strong><span style='color:red'>" + " " + (d.round).toUpperCase() + "</span>");

	    		var DATA = [
	    		{
	    			"name": "Ace1",
	    			"ace_value": d.ace1,
	    			"double_value": d.double1,
	    			"sec_value" : d.secPointWon1,
	    			"break_value" : d.break1,
	    		},
	    		{
	    			"name": "Ace2",
	    			"ace_value": 0-d.ace2,
	    			"double_value" : 0-d.double2,
	    			"sec_value" : 0-d.secPointWon2,
	    			"break_value" : 0-d.break2,
	    		}];

	    		var x_ace = d3.scale.linear()
	    			.domain([min_ace, max_ace])
	    			.range([0,width]);
	    		
	    		var x_double = d3.scale.linear()
	    			.domain([min_double, max_double])
	    			.range([0,width]);
	    		
	    		var x_sec = d3.scale.linear()
	    			.domain([-1, 1])
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
				


			     document.getElementById("text1").innerHTML += "<br><br><br><br><br><br><h3>Ace ("+d.ace2+")</h3><br><br><h3>Double ("+d.double2+")</h3><br><br><h3>secPointWon ("+ (d.secPointWon2*100).toFixed(0) +"%)</h3><br><br><h3>Break ("+ (d.break2*100).toFixed(0) +"%)</h3>";
				 document.getElementById("text2").innerHTML += "<br><br><br><br><br><br><h3>Ace ("+d.ace1+")</h3><br><br><h3>Double ("+d.double1+")</h3><br><br><h3>secPointWon ("+ (d.secPointWon1*100).toFixed(0) +"%)</h3><br><br><h3>Break ("+ (d.break1*100).toFixed(0) +"%)</h3>";


			    canvas1.call(tip);
			    canvas2.call(tip);
			    canvas3.call(tip);
			    canvas4.call(tip);
			    
			    canvas1.selectAll(".bar")
				    	.data(DATA)
				    .enter().append("rect")
				    	.attr("class","bar")
				    	.attr("x", function(d){ return x_ace(Math.min(0, d.ace_value));})
				    	.attr("y", function(d){ return y(d.name);})
				    	.attr("width", function(d){ return Math.abs(x_ace(d.ace_value) - x_ace(0)); })
				    	.attr("height", y.rangeBand())
				    	.style("fill", function(d){ if(d.name=="Ace1") return "#000099"; else return "#ff6600";})
				    	.on('mouseover', tip.show)
      					.on('mouseout', tip.hide);
				   
				
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
													return "-1.3em";
												else return ".35em";
							})
						.attr("font-family", "impact")
						.attr("font-size", "20px")
						.style("fill", "white");
				

			 	canvas2.selectAll(".bar")
				    	.data(DATA)
				    .enter().append("rect")
				    	.attr("class","bar")
				    	.attr("x", function(d){ return x_double(Math.min(0, d.double_value));})
				    	.attr("y", function(d){ return y(d.name);})
				    	.attr("width", function(d){ return Math.abs(x_double(d.double_value) - x_double(0)); })
				    	.attr("height", y.rangeBand())
				    	.style("fill", function(d){ if(d.name=="Ace1") return "#000099"; else return "#ff6600";})
				    	.on('mouseover', tip.show)
      					.on('mouseout', tip.hide);

				    	
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
													return "-1.3em";
												else return ".35em";
							})
						.attr("font-family", "impact")
						.attr("font-size", "20px")
						.style("fill", "white");


				canvas3.selectAll(".bar")
				    	.data(DATA)
				    .enter().append("rect")
				    	.attr("class","bar")
				    	.attr("x", function(d){ return x_sec(Math.min(0, d.sec_value));})
				    	.attr("y", function(d){ return y(d.name);})
				    	.attr("width", function(d){ return Math.abs(x_sec(d.sec_value) - x_sec(0)); })
				    	.attr("height", y.rangeBand())
				    	.style("fill", function(d){ if(d.name=="Ace1") return "#000099"; else return "#ff6600";})
				    	.on('mouseover', tip.show)
      					.on('mouseout', tip.hide);
				    	
			 var text3 = canvas3.selectAll("text")
						.data(DATA)
					.enter().append("text")
						.text(function(d){  if(d.sec_value < 0) 
												return (Math.abs(d.sec_value)*100).toFixed(0) + "%"; 
											else if(d.sec_value ==0) return "";
											else return (d.sec_value*100).toFixed(0) + "%";
										})
						.attr("x", function(d){ return x_sec(d.sec_value);})
						.attr("y", function(d){ return y(d.name) ;})
						.attr("dy", "1.5em")
						.attr("dx", function(d){ if(d.sec_value > 0)
													return "-2.5em";
												else return ".35em";
							})
						.attr("font-family", "impact")
						.attr("font-size", "20px")
						.style("fill", "white");


			canvas4.selectAll(".bar")
			    	.data(DATA)
			    .enter().append("rect")
			    	.attr("class","bar")
			    	.attr("x", function(d){ return x_sec(Math.min(0, d.break_value));})
			    	.attr("y", function(d){ return y(d.name);})
			    	.attr("width", function(d){ return Math.abs(x_sec(d.break_value) - x_sec(0)); })
			    	.attr("height", y.rangeBand())
			    	.style("fill", function(d){ if(d.name=="Ace1") return "#000099"; else return "#ff6600";})
			    	.on('mouseover', tip.show)
      				.on('mouseout', tip.hide);
				    	
			 var text4 = canvas4.selectAll("text")
						.data(DATA)
					.enter().append("text")
						.text(function(d){  if(d.break_value < 0) 
												return (Math.abs(d.break_value)*100).toFixed(0) + "%"; 
											else if(d.break_value ==0) return "";
											else return (d.break_value*100).toFixed(0) + "%";
										})
						.attr("x", function(d){ return x_sec(d.break_value);})
						.attr("y", function(d){ return y(d.name) ;})
						.attr("dy", "1.5em")
						.attr("dx", function(d){ if(d.break_value > 0)
													return "-2.5em";
												else return ".35em";
							})
						.attr("font-family", "impact")
						.attr("font-size", "20px")
						.style("fill", "white");


	    	}

	    })



	  });
  	
}

