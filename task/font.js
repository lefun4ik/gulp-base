const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber"); // Перехват ошибок
const notify = require("gulp-notify"); // Позволяет создавать различные всплывающие сообщения
const newer = require("gulp-newer"); // Игнорирует уже сжатые шрифты
const fonter = require("gulp-fonter"); // конвертер шрифтов
const ttf2woff2 = require("gulp-ttf2woff2"); // конвертер шрифтов для woff2

// Обработка шрифтов
const font = () => {
	return src(path.font.src) // Возвращаем задаче поток
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: "Font",
				message: error.message
			}))
		}))
		.pipe(newer(path.font.dest)) // фильтр уже сжатых или изменённых шрифтов
		.pipe(fonter(app.fonter)) // конвертер шрифтов
		.pipe(dest(path.font.dest)) // Передаем файловый поток для записи
		.pipe(ttf2woff2()) // Конвертируем в woff2
		.pipe(dest(path.font.dest)); // Передаем файловый поток для записи
}

module.exports = font; // экспортируем задачу