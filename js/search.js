/*
	MOVIE PAL - SEARCH
*/

// _____________________________________________________________________________
// CACHING DOM ELEMENTS

var wrapDiv = document.getElementById("wrap");
var form = document.getElementById("movie-form");
var movieInput = form.elements["movie-name"];

// _____________________________________________________________________________
// SETUP

var movieFavorites = new StorableData("movieFavorites");
var movieEndpoint = "http://api.themoviedb.org/3/search/movie";
var movieParameters = {
	api_key: "cd3f572819f51ec4e3c3cdf618ed9143",
	query: "",
	page: "1"
}
var searchResults;
var base = "http://image.tmdb.org/t/p/";
var posterSize = "w154";

function callMovie(event) {
	event.preventDefault();
	var movieName = movieInput.value;
	if (movieName === "") return false;
	movieParameters.query = movieName;
	var movieApiCaller = new ApiCaller(movieEndpoint, movieParameters);
	movieApiCaller.getJson(printMovieReport);
	console.log(movieApiCaller.requestUrl);
	console.log(movieName);
}

form.onsubmit = callMovie;

// _____________________________________________________________________________
// SEARCH FORM API REQUEST

var wrapSearch = document.getElementById("search-results");
var template = wrapSearch.querySelector(".movie-result");
wrapSearch.removeChild(template);

function printMovieReport(jsonReport) {
	console.log(jsonReport);
	wrapSearch.innerHTML = "";
	var movies = jsonReport.results;
	searchResults = movies;
	for (var i = 0; i < jsonReport.results.length; i += 1){
		console.dir(jsonReport);
		var clone = template.cloneNode(true);
		clone.dataset.index = i;
		var poster = clone.querySelector(".poster");
		var url = base + posterSize + jsonReport.results[i].poster_path;
		if (jsonReport.results[i].poster_path) {
			poster.setAttribute("src", url);
		}
		var movieName = jsonReport.results[i].original_title;
		var title = clone.querySelector(".title");
		title.textContent = movieName;
		var releaseDate = clone.querySelector(".release-date");
		releaseDate.textContent = jsonReport.results[i].release_date;
		var popularity = clone.querySelector(".popularity");
		popularity.textContent = jsonReport.results[i].popularity;
		var plot = clone.querySelector(".plot");
		plot.textContent = jsonReport.results[i].overview;
		wrapSearch.appendChild(clone);
	}
}

// _____________________________________________________________________________
// ADDING SEARCH RESULTS TO FAVORITES

wrapSearch.onclick = function(event) {
	if (event.target.className === "favorite-button fa fa-heart") {
		var favoriteButton = event.target;
		favoriteButton.className = "favorite-added fa fa-check-circle";
		var containingFigure = favoriteButton.parentElement;
		containingFigure.style.opacity = "0.5";
		console.log(searchResults);
		var movieDisplay = favoriteButton.parentElement.parentElement;
		var movieIndex = movieDisplay.dataset.index;
		var movieData = searchResults[movieIndex];
		console.log(movieIndex);
		movieFavorites.add(movieData);
	}
}
