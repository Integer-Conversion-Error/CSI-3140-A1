document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const genreFilter = document.getElementById('genre-filter');
    const userFilter = document.getElementById('user-filter');
    const searchBtn = document.getElementById('search-btn');
    const resultsContainer = document.getElementById('results-container');
    const noResultsMessage = document.getElementById('no-results-message');
    const addBookForm = document.getElementById('add-book-form');
    const userSelects = [document.getElementById('user-filter'), document.getElementById('add-book-user')];

    // Fetch users and populate dropdowns
    function fetchUsers() {
        fetch('get-users.php')
            .then(response => response.json())
            .then(users => {
                const addUserSelect = document.getElementById('add-book-user');
                // Clear existing options except the first one
                userFilter.innerHTML = '<option value="all">All Users</option>';
                addUserSelect.innerHTML = '<option value="">Select a user</option>';

                users.forEach(user => {
                    const option1 = document.createElement('option');
                    option1.value = user.id;
                    option1.textContent = user.username;
                    userFilter.appendChild(option1);

                    const option2 = document.createElement('option');
                    option2.value = user.id;
                    option2.textContent = user.username;
                    addUserSelect.appendChild(option2);
                });
            });
    }

    // Render books
    function renderBooks(books) {
        resultsContainer.innerHTML = ''; // Clear previous results
        if (books.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
            books.forEach(book => {
                const bookDiv = document.createElement('div');
                
                const title = document.createElement('strong');
                title.textContent = `${book.title} by ${book.author}`;
                
                const details = document.createElement('p');
                details.textContent = `Genre: ${book.genre}, Year: ${book.year}`;

                const addedBy = document.createElement('p');
                addedBy.textContent = `Added by: ${book.username}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.dataset.id = book.id;
                deleteBtn.addEventListener('click', () => deleteBook(book.id));

                bookDiv.appendChild(title);
                bookDiv.appendChild(details);
                bookDiv.appendChild(addedBy);
                bookDiv.appendChild(deleteBtn);
                resultsContainer.appendChild(bookDiv);
            });
        }
    }

    // Search for books
    function searchBooks() {
        const query = searchInput.value;
        const genre = genreFilter.value;
        const userId = userFilter.value;

        fetch(`search-books.php?query=${query}&genre=${genre}&user_id=${userId}`)
            .then(response => response.json())
            .then(books => renderBooks(books));
    }

    // Add a new book
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addBookForm);
        fetch('add-book.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addBookForm.reset();
                searchBooks(); // Refresh the list
            }
        });
    });

    // Delete a book
    function deleteBook(id) {
        const formData = new FormData();
        formData.append('id', id);

        fetch('delete-book.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                searchBooks(); // Refresh the list
            }
        });
    }

    // Event Listeners
    searchBtn.addEventListener('click', searchBooks);

    // Initial load
    fetchUsers();
    searchBooks();
});
