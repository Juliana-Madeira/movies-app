//de preferência use a sua chave para se familiarizar com a API
//https://www.themoviedb.org/settings/api
//cadastre-se e faça login


//url de requisições da api , com endpoint por popularidade de filmes (rating)
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0e2d71cc79a7659ab025cacda2927da4&page=1`

//caminho das imagens dos filmes
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

//search 
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=0e2d71cc79a7659ab025cacda2927da4&query="`


//get movies
//função para pegar os movies pela popularity (rating)
const getMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    showDataMovies(data.results);   //a api responde como 'results'
}
//Get movies by popuarity, chamar a função
getMovies(API_URL)


//search
//evento no form para fazer a search (DOM) - event listener
const form = document.getElementById('form')
const inputSearch = document.getElementById('search')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = inputSearch.value
    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_URL + searchTerm)
        inputSearch.value = ''
    } else {
        window.location.reload()
    }
})


const main = document.getElementById('main')
//colocar dados dos movies nos cards pelo DOM 
function showDataMovies(movies) {
    main.innerHTML = ''
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie
    
    const movieCard = document.createElement('div')
    movieCard.classList.add('movie-card')
    movieCard.innerHTML = `
    <div class="movie-card">
        <img src="${IMG_PATH + poster_path}" 
        alt="${title}" 
        class="movie-image">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="rating">
                ${vote_average}
                <i class="fa-solid fa-star"></i>
            </span>
        </div>
        <div id="details">
            Details
        </div>
        <div class="overview">
            <p>${overview}</p>
        </div>
    </div>
    `
    main.appendChild(movieCard)
    })
}

