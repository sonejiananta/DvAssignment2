$(document).ready(function()	{
	
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 40
	}, width = 725 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.range([0, width]);
	
	var y = d3.scale.linear()
		.range([height, 0]);

	var div = d3.select("body")
		.append("div")
			.attr("id", "schoolinfo")
			.style("opacity", 0);

	//var color = d3.scale.category10();
	var color = d3.scale.ordinal()
		.domain([1, 2, 3])
		.range(["rgb(53,135,212)", "rgb(77, 175, 74)", "rgb(228, 26, 28)"]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var svg = d3.select("#chart")
		.append("svg")
			.attr("class", "chart")
			.attr("viewBox", "0 0 725 600")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("10yearAUSOpenMatches.csv", function(error, data) {

		x.domain([0, 120]).nice();
		y.domain([0, 120]).nice();

		//x axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
				.attr("class", "label")
				.attr("x", width)
				.attr("y", -6)
				.style("text-anchor", "end")
				.text("Winner")
				.style("font-size","15px");

		//y axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
				.attr("class", "label")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Error")
				.style("font-size","15px");

		//legend y position
		var LYP = 0, 
			LXP = 570;
			
		
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 20).attr("r", 7).style("fill", "#005073").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 25).style("text-anchor", "start").text(function(d) {
			return "Roger Federer";
		});
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 50).attr("r", 7).style("fill", "#71c7ec").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 55).style("text-anchor", "start").text(function(d) {
			return "Opponent";
		});
		

		//circles
		svg.selectAll(".dot1")
			.data(data)
			.enter()
			.append("circle")
				.attr("class", "dot1")
				.attr("r",function (d){return d.total1/10;})
				.attr("cx", 
					function(d) {
						if(d.year==2009 && d.player1=="Roger Federer")
						return x(d.winner1);
					})
				.attr("cy", 
					function(d) {
						if(d.year==2009 && d.player1=="Roger Federer")
						return y(d.error1);
					})
				.style("fill", "#005073")
				.on("mouseover", function(d) {      
		            div.transition()        
		                .duration(200)      
		                .style("opacity", .9);      
		            div .html("Round: " + d.round.toUpperCase() + "<br/>Name: "  + d.player1)  
		            	.style("font-family", "courier")
		            	.style("font-size","15px")
		            	.style("color","red")
		                .style("left", (d3.event.pageX) + "px")     
		                .style("top", (d3.event.pageY - 45) + "px");    
		            })                
		        .on("mouseout", function(d) {       
		            div.transition()        
		                .duration(500)      
		                .style("opacity", 0);   
		        });
				


		svg.selectAll(".dot2")
			.data(data)
		.enter().append("circle")
				.attr("class", "dot2")
				.attr("r", function (d){return d.total2/10;})
				.attr("cx", 
					function(d) {
						if(d.year==2009 && d.player1=="Roger Federer")
						return x(d.winner2);
					})
				.attr("cy", 
					function(d) {
						if(d.year==2009 && d.player1=="Roger Federer")
						return y(d.error2);
					})
				.style("fill", "#71c7ec")
				.on("mouseover", function(d) {      
		            div.transition()        
		                .duration(200)      
		                .style("opacity", .9);      
		            div .html("Round: " + d.round.toUpperCase() + "<br/>Name: "  + d.player2)  
		            	.style("font-family", "courier")
		            	.style("font-size","15px")
		            	.style("color","red")
		                .style("left", (d3.event.pageX) + "px")     
		                .style("top", (d3.event.pageY - 45) + "px");    
		            })                  
		        .on("mouseout", function(d) {       
		            div.transition()        
		                .duration(500)      
		                .style("opacity", 0);   
		        });

				
		var running = false;
		var timer;
		
		$("button").on("click", function() {
		
			var duration = 2000,
				maxstep = 2014,
				minstep = 2009;
			
			if (running == true) {
			
				$("button").html("Play");
				running = false;
				clearInterval(timer);
				
			} 

			else if (running == false) {
			
				$("button").html("Pause");
				
				sliderValue = $("#slider").val();
				
				timer = setInterval( function(){
						if (sliderValue < maxstep){
							sliderValue++;
							$("#slider").val(sliderValue);
							$('#range').html(sliderValue);
						}
						$("#slider").val(sliderValue);
						update();
					
				}, duration);

				running = true;
				
				
			}

		});
	
		$("#slider").on("change", function(){
			update();
			$("#range").html($("#slider").val());
			clearInterval(timer);
			$("button").html("Play");
		});
	
		update = function() {
		
			d3.selectAll(".dot1")
				.transition()
				.duration(1000)
				.attr("cy", function(d) {
			
					switch ($("#slider").val()) {
						case "2009":
							if(d.year==2009&& d.player1=="Roger Federer")
							return y(d.error1);
							break;
						case "2010":
							if(d.year==2010&& d.player1=="Roger Federer")
							return y(d.error1);
							break;
						case "2011":
							if(d.year==2011&& d.player1=="Roger Federer")
							return y(d.error1);
							break;
						case "2012":
							if(d.year==2012&& d.player1=="Roger Federer")
							return y(d.error1);
							break;
						case "2013":
							if(d.year==2013&& d.player1=="Roger Federer")
							return y(d.error1);
							break;
						case "2014":
							if(d.year==2014&& d.player1=="Roger Federer")
							return y(d.error1);
							break;
						
					}
				})
				//.transition()
				.duration(1000)
				.attr("cx", function(d) {
					switch ($("#slider").val()) {
						case "2009":
							if(d.year==2009&& d.player1=="Roger Federer")
							return x(d.wiiner1);
							break;
						case "2010":
							if(d.year==2010&& d.player1=="Roger Federer")
							return x(d.winner1);
							break;
						case "2011":
							if(d.year==2011&& d.player1=="Roger Federer")
							return x(d.winner1);
							break;
						case "2012":
							if(d.year==2012&& d.player1=="Roger Federer")
							return x(d.winner1);
							break;
						case "2013":
							if(d.year==2013&& d.player1=="Roger Federer")
							return x(d.winner1);
							break;
						case "2014":
							if(d.year==2014&& d.player1=="Roger Federer")
							return x(d.winner1);
							break;
					}
				});

			d3.selectAll(".dot2")
				.transition()
				.duration(1000)
				.attr("cy", function(d) {
			
					switch ($("#slider").val()) {
						case "2009":
							if(d.year==2009&& d.player1=="Roger Federer")
							return y(d.error2);
							break;
						case "2010":
							if(d.year==2010&& d.player1=="Roger Federer")
							return y(d.error2);
							break;
						case "2011":
							if(d.year==2011&& d.player1=="Roger Federer")
							return y(d.error2);
							break;
						case "2012":
							if(d.year==2012&& d.player1=="Roger Federer")
							return y(d.error2);
							break;
						case "2013":
							if(d.year==2013&& d.player1=="Roger Federer")
							return y(d.error2);
							break;
						case "2014":
							if(d.year==2014&& d.player1=="Roger Federer")
							return y(d.error2);
							break;
						
					}
				})
			//	.transition()
				.duration(1000)
				.attr("cx", function(d) {
					switch ($("#slider").val()) {
						case "2009":
							if(d.year==2009&& d.player1=="Roger Federer")
							return x(d.winner2);
							break;
						case "2010":
							if(d.year==2010&& d.player1=="Roger Federer")
							return x(d.winner2);
							break;
						case "2011":
							if(d.year==2011&& d.player1=="Roger Federer")
							return x(d.winner2);
							break;
						case "2012":
							if(d.year==2012&& d.player1=="Roger Federer")
							return x(d.winner2);
							break;
						case "2013":
							if(d.year==2013&& d.player1=="Roger Federer")
							return x(d.winner2);
							break;
						case "2014":
							if(d.year==2014&& d.player1=="Roger Federer")
							return x(d.winner2);
							break;
					}
				});
		};
		
	});

});
