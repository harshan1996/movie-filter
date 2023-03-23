let result = document.getElementById("result");
let filter = document.getElementById("filter");
const moviesList = [];

const fetchMovies = async () => {
  let details = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=ff29df6664fc09dedee49f08a4e6e998"
  );
  const { results } = await details.json();

  // Making the "loading ..." disappear before rendering the movies from the API which has status code 200.
  result.innerHTML = "";

  results.forEach((movie) => {
    const li = document.createElement("li");

    li.innerHTML = `
    <div class="movie-info">
            <img
              src=https://image.tmdb.org/t/p/w500${movie.poster_path}
              alt="random movie"
            />
            <h4>${movie.original_title}</h4>
            <p>${movie.release_date}</p>
          </div>`;
    moviesList.push(li);
    result.appendChild(li);
  });
};
fetchMovies();

// Filtering the movies as per user input
filter.addEventListener("input", (e) => {
  searchMovie(e.target.value);
});

const searchMovie = (myEvent) => {
  moviesList.forEach((movie) => {
    if (movie.innerText.toLowerCase().includes(myEvent.toLowerCase())) {
      movie.classList.remove("hide");
    } else {
      movie.classList.add("hide");
    }
  });
};
