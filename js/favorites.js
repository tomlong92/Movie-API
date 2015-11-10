/*
	Interactive APIs
*/

// _____________________________________________________________________________
// CACHING DOM ELEMENTS

var favoritesDiv = document.getElementById("favorites");
var favoriteMovieDisplayTemplate = document.querySelector(".favorite-display");
favoritesDiv.removeChild(favoriteMovieDisplayTemplate);

// _____________________________________________________________________________
// SETUP

var movieFavorites = new StorableData("movieFavorites");
renderFavorites();

// _____________________________________________________________________________
// DISPLAYING FAVORITES AND MAKING THEM INTERACTIVE

function renderFavorites() {
	favoritesDiv.innerHTML = "";
	for (var i = 0; i < movieFavorites.getLength(); i++) {
		var fav = movieFavorites.get(i);
		var clone = favoriteMovieDisplayTemplate.cloneNode(true);
		clone.dataset.index = i;
		clone.querySelector(".title").textContent = fav.title;
		
		if (fav.backdrop_path) {
			var base = "http://image.tmdb.org/t/p/";
			var posterSize = "w780";
			var url = base + posterSize + fav.backdrop_path;
			clone.querySelector(".poster").src = url;
		}	
		favoritesDiv.appendChild(clone);
	}
}

favoritesDiv.onclick = function (event) {
	if (event.target.classList.contains("remove-button")) {
		var favoriteDisplay = event.target.parentElement.parentElement;
		var favoriteIndex = favoriteDisplay.dataset.index;
		movieFavorites.delete(favoriteIndex);
		renderFavorites();
	}
};
