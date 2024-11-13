let personalMovieDB = {
    count: null,
    movies: null
}

let numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?', '');
CheckPrompt(numberOfFilms, 'Сколько фильмов вы уже посмотрели?');
personalMovieDB.count = numberOfFilms;
let firstFilm = prompt('Один из последних просмотренных фильмов?', '');
CheckPrompt(firstFilm, 'Один из последних просмотренных фильмов?');
let firstFilmRate = prompt('На сколько оцените его?', '');
CheckPrompt(firstFilmRate, 'На сколько оцените его?');
let secondFilm = prompt('Один из последних просмотренных фильмов?', '');
CheckPrompt(secondFilm, 'Один из последних просмотренных фильмов?');
let secondFilmRate = prompt('На сколько оцените его?', '');
CheckPrompt(secondFilmRate, 'На сколько оцените его?');

personalMovieDB.movies = {
    [firstFilm]: firstFilmRate,
    [secondFilm]: secondFilmRate
}

console.log(personalMovieDB);
function CheckPrompt(prompt_, text) {
    if (prompt_ === null || prompt_ === '') {
        alert('Вы ввели некорректные данные (больше 50 символов) или не ввели их вовсе');
        prompt_ = prompt(text, '');
        CheckPrompt(prompt_, text);
    }
}