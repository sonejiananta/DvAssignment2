window.onload = function()
{
	document.getElementById("form").reset();

	var matches = document.getElementById("match");
	d3.csv('10yearAUSOpenMatches.csv', function(error,data){
    	data.forEach(function(d){
      		var options = document.createElement('option')
      		options.text ="    "+ d.year +" , " +  (d.round).toUpperCase() + " : " + d.player1.toUpperCase() + " vs " + d.player2.toUpperCase();
      		matches.appendChild(options);
    	});

  	});


};
