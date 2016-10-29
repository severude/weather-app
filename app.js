function JSONP_LocalWeather(input) {
	var baseUrl = "http://api.worldweatheronline.com/premium/v1/weather.ashx";
	var key = "2fa1f587a4894f2f969215301162410";
	var url = baseUrl + "?key=" + key + "&q=" + input.query + "&format=" + input.format + "&num_of_days=" + input.num_of_days;
	jsonP(url, input.callback);
}

function jsonP(url, callback) {
	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		contentType: "application/json",
		jsonpCallback: callback,
		dataType: 'jsonp',
		success: function (json) {
			console.dir('success');
		},
		error: function (e) {
			console.log(e.message);
		}
	});
}

function GetLocalWeather(e) {
	e.preventDefault();
    var searchField = $('#search');
    $search = searchField.val();
	searchField.val("");
	var localWeatherInput = {
		query: $search,
		format: 'json',
		num_of_days: '5',
		date: '',
		fx: '',
		cc: '',
		includelocation: '',
		show_comments: '',
		callback: 'LocalWeatherCallback'
	};
	JSONP_LocalWeather(localWeatherInput);
}

function LocalWeatherCallback(localWeather) {
	console.log(localWeather);

	var container = $('#container');
	document.getElementById('container').style.padding = "1em";
	
	if ("error" in localWeather.data) {
		var errString = localWeather.data.error[0].msg;
		console.log(errString);
		container.html("<h2>Location not found, please try again</h2>");
	} else {
		var weatherHTML = "";

		weatherHTML += '<h1>' + $search + '</h1>';
		weatherHTML += '<h2>' + localWeather.data.current_condition[0].weatherDesc[0].value + '</h2>';
		
		weatherHTML += '<div id="subcontainer" class="clearfix">';

		weatherHTML += '<div id="panel1" class="panel">';
		weatherHTML += "<h3>Current Conditions</h3>";
		weatherHTML += "Temp F: " + localWeather.data.current_condition[0].temp_F;
		weatherHTML += "<br/> Feels Like F: " + localWeather.data.current_condition[0].FeelsLikeF + "</br>";
		weatherHTML += "<br/> Temp C: " + localWeather.data.current_condition[0].temp_C;
		weatherHTML += "<br/> Feels Like C: " + localWeather.data.current_condition[0].FeelsLikeC + "</br>";
		weatherHTML += "<br/> Wind Direction: " + localWeather.data.current_condition[0].winddir16Point;
		weatherHTML += "<br/> Wind Speed MPH: " + localWeather.data.current_condition[0].windspeedMiles + "</br>";
		weatherHTML += "<br/> Pressure: " + localWeather.data.current_condition[0].pressure;
		weatherHTML += "<br/> Humidity: " + localWeather.data.current_condition[0].humidity;
		weatherHTML += '</div>';

		weatherHTML += '<div id="panel2" class="panel">';
		weatherHTML += "<h3>Current Forecast</h3>";
		weatherHTML += "Today's High Temp F: " + localWeather.data.weather[0].maxtempF;
		weatherHTML += "<br/> Today's Low Temp F: " + localWeather.data.weather[0].mintempF + "</br>";
		weatherHTML += "<br/> Tomorrow's High Temp F: " + localWeather.data.weather[1].maxtempF;
		weatherHTML += "<br/> Tomorrow's Low Temp F: " + localWeather.data.weather[1].mintempF + "</br>";
		weatherHTML += "<br/> Two Day Forecast High F: " + localWeather.data.weather[2].maxtempF;
		weatherHTML += "<br/> Two Day Forecast Low F: " + localWeather.data.weather[2].mintempF + "</br>";
		weatherHTML += "<br/> Three Day Forecast High F: " + localWeather.data.weather[3].maxtempF;
		weatherHTML += "<br/> Three Day Forecast Low F: " + localWeather.data.weather[3].mintempF + "</br>";
		weatherHTML += "<br/> Four Day Forecast High F: " + localWeather.data.weather[4].maxtempF;
		weatherHTML += "<br/> Four Day Forecast Low F: " + localWeather.data.weather[4].mintempF;
		weatherHTML += '</div>';

		weatherHTML += '<div id="panel3" class="panel">';
		weatherHTML += "<h3>Sunrise and Sunset</h3>";
		weatherHTML += "Sunrise: " + localWeather.data.weather[0].astronomy[0].sunrise;
		weatherHTML += "<br/> Sunset: " + localWeather.data.weather[0].astronomy[0].sunset + "</br>";
		weatherHTML += "<br/> Moonrise: " + localWeather.data.weather[0].astronomy[0].moonrise;
		weatherHTML += "<br/> Moonset: " + localWeather.data.weather[0].astronomy[0].moonset;
		weatherHTML += '</div>';

		weatherHTML += '</div>';

		weatherHTML += '<div id="footer">';
		weatherHTML += 'Observation Time UTC: ' + localWeather.data.current_condition[0].observation_time;
		weatherHTML += '</div>';

		container.html(weatherHTML);
	}
}

var $search = "";  //Global search value that all functions have access to

$('form').submit(function (evt) {
	GetLocalWeather(evt);
});
