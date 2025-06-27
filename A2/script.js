document.addEventListener('DOMContentLoaded', () => {
    const addMovieForm = document.getElementById('add-movie-form');
    const movieList = document.getElementById('movie-list');
    const sortByTitleButton = document.getElementById('sort-by-title');
    const sortByRatingButton = document.getElementById('sort-by-rating');
    const filterByGenreSelect = document.getElementById('filter-by-genre');

    const editModal = document.getElementById('edit-modal');
    const editMovieForm = document.getElementById('edit-movie-form');
    const closeModalButton = document.querySelector('.close-button');
    const cancelEditButton = document.querySelector('.btn-cancel');

    let movies = [];
    let currentRating = 0;

    function loadMovies() {
        const storedMovies = localStorage.getItem('movies');
        if (storedMovies) {
            movies = JSON.parse(storedMovies);
            renderMovies();
        }
    }

    function saveMovies() {
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    function renderMovies(movieArray = movies) {
        movieList.innerHTML = '';
        movieArray.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            if (movie.watched) {
                movieCard.classList.add('watched');
            }
            movieCard.dataset.id = movie.id;

            movieCard.innerHTML = `
                <h3>${movie.title}</h3>
                <div class="star-rating-display">
                    ${[...Array(5)].map((_, i) => `<span class="star ${i < movie.rating ? 'selected' : ''}">&#9733;</span>`).join('')}
                </div>
                <span class="genre">${movie.genre}</span>
                <div class="card-buttons">
                    <button class="btn-edit">&#9998;</button>
                    <button class="btn-watch">${movie.watched ? '✓' : '👁'}</button>
                    <button class="btn-remove">&times;</button>
                </div>
            `;
            movieList.appendChild(movieCard);
        });
    }

    function handleAddMovie(event) {
        event.preventDefault();
        const title = document.getElementById('title-input').value;
        const genre = document.getElementById('genre-input').value;
        
        if (!title || currentRating === 0) {
            alert('Please provide a title and a rating.');
            return;
        }

        const newMovie = {
            id: Date.now(),
            title,
            genre,
            rating: currentRating,
            watched: false
        };

        movies.push(newMovie);
        saveMovies();
        renderMovies();
        addMovieForm.reset();
        resetStarRating('add-star-rating');
        currentRating = 0;
    }

    function handleListClick(event) {
        const target = event.target;
        const movieCard = target.closest('.movie-card');
        if (!movieCard) return;

        const movieId = Number(movieCard.dataset.id);

        if (target.classList.contains('btn-remove')) {
            movies = movies.filter(movie => movie.id !== movieId);
            saveMovies();
            renderMovies();
        } else if (target.classList.contains('btn-watch')) {
            const movie = movies.find(movie => movie.id === movieId);
            movie.watched = !movie.watched;
            saveMovies();
            renderMovies();
        } else if (target.classList.contains('btn-edit')) {
            openEditModal(movieId);
        }
    }

    function openEditModal(movieId) {
        const movie = movies.find(m => m.id === movieId);
        document.getElementById('edit-movie-id').value = movie.id;
        document.getElementById('edit-title-input').value = movie.title;
        document.getElementById('edit-genre-input').value = movie.genre;
        setupStarRating('edit-star-rating', movie.rating);
        editModal.style.display = 'flex';
    }

    function closeEditModal() {
        editModal.style.display = 'none';
    }

    function handleEditMovie(event) {
        event.preventDefault();
        const id = Number(document.getElementById('edit-movie-id').value);
        const title = document.getElementById('edit-title-input').value;
        const genre = document.getElementById('edit-genre-input').value;
        const rating = currentRating;

        const movieIndex = movies.findIndex(m => m.id === id);
        if (movieIndex > -1) {
            movies[movieIndex] = { ...movies[movieIndex], title, genre, rating };
            saveMovies();
            renderMovies();
            closeEditModal();
        }
    }

    function setupStarRating(containerId, rating = 0) {
        const starContainer = document.getElementById(containerId);
        const stars = starContainer.querySelectorAll('.star');
        currentRating = rating;

        function updateStars(r) {
            stars.forEach(star => {
                star.classList.toggle('selected', star.dataset.value <= r);
            });
        }

        stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                stars.forEach(s => s.classList.remove('hover'));
                for (let i = 0; i < star.dataset.value; i++) {
                    stars[i].classList.add('hover');
                }
            });

            star.addEventListener('mouseout', () => {
                stars.forEach(s => s.classList.remove('hover'));
            });

            star.addEventListener('click', () => {
                currentRating = star.dataset.value;
                updateStars(currentRating);
            });
        });

        starContainer.addEventListener('mouseleave', () => {
             updateStars(currentRating);
        });

        updateStars(rating);
    }
    
    function resetStarRating(containerId) {
        const starContainer = document.getElementById(containerId);
        const stars = starContainer.querySelectorAll('.star');
        stars.forEach(star => star.classList.remove('selected'));
    }

    function sortByTitle() {
        movies.sort((a, b) => a.title.localeCompare(b.title));
        renderMovies();
    }

    function sortByRating() {
        movies.sort((a, b) => b.rating - a.rating);
        renderMovies();
    }

    function filterByGenre() {
        const selectedGenre = filterByGenreSelect.value;
        if (selectedGenre === 'All') {
            renderMovies(movies);
        } else {
            const filteredMovies = movies.filter(movie => movie.genre === selectedGenre);
            renderMovies(filteredMovies);
        }
    }

    addMovieForm.addEventListener('submit', handleAddMovie);
    movieList.addEventListener('click', handleListClick);
    sortByTitleButton.addEventListener('click', sortByTitle);
    sortByRatingButton.addEventListener('click', sortByRating);
    filterByGenreSelect.addEventListener('change', filterByGenre);
    
    closeModalButton.addEventListener('click', closeEditModal);
    cancelEditButton.addEventListener('click', closeEditModal);
    editMovieForm.addEventListener('submit', handleEditMovie);

    setupStarRating('add-star-rating');
    loadMovies();
});
