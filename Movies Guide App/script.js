const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

function showMoviedata(data) {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("noBackGround")
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;

  const movieElemet = document.createElement("div");
  movieElemet.classList.add("movie-info");
  movieElemet.innerHTML = `<h2>${Title}</h2>
                            <p><strong>IMDB: &#11088 </strong>${imdbRating}</p>`;
  const movieGenreElemet = document.createElement("div");
  movieGenreElemet.classList.add("movie-genre");
  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerText = element;
    movieGenreElemet.appendChild(p);
  });
  // movieElemet.innerHTML+= Genre.split(",").map(element => {
  //    return `<p>${element}</p>`
  //   }).join('');
  movieElemet.appendChild(movieGenreElemet);
  movieElemet.innerHTML += `<p><strong>Release Date: </strong>${Released}</p>
                           <p><strong>Duration: </strong>${Runtime}</p>
                           <p><strong>Cast: </strong>${Actors}</p>
                           <p><strong>Story: </strong>${Plot}</p>`;

  const moviePosterElemet = document.createElement("div");
  moviePosterElemet.classList.add("movie-poster")
  moviePosterElemet.innerHTML=`<img src="${Poster}"/>`
  movieContainer.appendChild(moviePosterElemet);
  movieContainer.appendChild(movieElemet);
}

async function getMovieInfo(movieName) {
    try {
  const myApiKey = "14d6e837";
  const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movieName}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  showMoviedata(data);
} catch (error) {
     showErrorMsg("Ooooops, No Such Movie Found!!!")   
}
}
function showErrorMsg(message){ 
    movieContainer.classList.add("noBackGround")
    movieContainer.innerHTML=`<h2>${message}</h2>`
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    showErrorMsg("Ruko Jara Sabar karo...")
    getMovieInfo(movieName);
  }
  else{
    showErrorMsg("Enter A Movie Name...")
  }
});
