/**
 * Renders the movie database table if the database is not private.
 * @param {Object} personalMovieDB - The movie database object.
 */
function renderMovieDB() {
  if (!personalMovieDB.private) {
    // Создание элемента таблицы
    const table = document.createElement('table');
    // Создание "Головы" таблицы
    const thead = document.createElement('thead');
    // Тело таблицы
    const tbody = document.createElement('tbody');
    // Добавляем таблицу в тело и "Голову"
    table.appendChild(thead);
    table.appendChild(tbody);
    // Создание элемента строки, который запихнем в верх таблицы
    const row = document.createElement('tr');
    // Создание заголовков таблицы
    const headers = ['Movie', 'Rating'];
    headers.forEach(headerText => {
      const header = document.createElement('th');
      const textNode = document.createTextNode(headerText);
      header.appendChild(textNode);
      row.appendChild(header);
    });
    thead.appendChild(row);

    // Заполнение таблицы данными
    Object.keys(personalMovieDB.movies).forEach(movie => {
      const row = document.createElement('tr');
      // Создание ячейек таблицы
      const movieCell = document.createElement('td');
      const ratingCell = document.createElement('td');

      movieCell.textContent = movie;
      ratingCell.textContent = personalMovieDB.movies[movie];

      // Заполнение ряда таблицы данными
      row.appendChild(movieCell);
      row.appendChild(ratingCell);

      // Добавление ряда данных в таблицу
      tbody.appendChild(row);
    });

    // Получаем объект в который запихнем таблицу
      const container = document.getElementById('movie-table-container');
      
    container.appendChild(table);
  }
}

let personalMovieDB = {
    private: false,
    movies: null
}

personalMovieDB.movies = {
    "1+1": 5,
    "Interstellar": 4.5,
    "Inception": 5
}
renderMovieDB()
