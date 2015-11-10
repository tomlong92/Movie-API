/*
	ApiCaller Constructor
*/

function ApiCaller(endpoint, parameters) {
	this.requestUrl = this.buildRequestUrl(endpoint, parameters);
}

ApiCaller.prototype.buildRequestUrl = function (endpoint, parameters) {

	var queries = "";
	var parameterArray = Object.keys(parameters);

	for (i = 0; i < parameterArray.length; i += 1) {
		
		var parameterName = parameterArray[i];
		var parameterValue = parameters[parameterName];
		var encodeParameterValue = encodeURIComponent(parameterValue);
		var query = (parameterName + "=" + encodeParameterValue);

		if (i === parameterArray.length - 1) {
			var queries = (queries + query);
		}
		else {
			var queries = (queries + query + "&");
		}

		var url = (endpoint + "?" + queries);

		console.log(parameterName);
		console.log(parameterValue);
		console.log(query);
		console.log(queries);
		console.log(url);
	}
	return url;
}

ApiCaller.prototype.getJson = function (callback) {
	
	var myRequest = new XMLHttpRequest();
	myRequest.open("GET", this.requestUrl, true);
	myRequest.onreadystatechange = function() {
	if (this.readyState === 4 && this.status === 200) {
		var jsonResponse = JSON.parse(this.responseText);
		callback(jsonResponse);
	}
};

myRequest.send();
	
}
