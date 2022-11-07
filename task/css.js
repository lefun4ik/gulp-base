const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js");  // добавляем пути из файла path.js
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber"); // перехват ошибок
const notify = require("gulp-notify"); // позволяет создавать различные всплывающие сообщения
const concat = require("gulp-concat"); // объединяет файлы стилей в один
const cssimport = require("gulp-cssimport"); // заменяет директивы import на содержимое этих файлов
const autoprefixer = require("gulp-autoprefixer"); // автопрефиксер
const csso = require("gulp-csso"); // сжатие стилей в конечном файле
const rename = require("gulp-rename"); // изменение имени файла
const groupCssMediaQueries = require("gulp-group-css-media-queries"); // группировка медиазапросов

// Обработка CSS
const css = () => {
	return src(path.css.src, { sourcemaps: app.isDev }) // передаем путь до исходных файлов с помощью метода src
		.pipe(plumber({ // обработка ошибок + редактирование уведомления
			errorHandler: notify.onError(error => ({
				title: "CSS",
				message: error.message
			}))
		}))
		.pipe(concat("style.css")) // объединяем файлы css в style.css
		.pipe(cssimport()) // заменяет директивы import на содержимое этих файлов
		.pipe(autoprefixer()) // добавляем префиксы для браузеров
		.pipe(groupCssMediaQueries()) // группируем медизапросы
		.pipe(dest(path.css.dest, { sourcemaps: app.isDev })) // передаем файловый поток для записи
		.pipe(rename({ suffix: ".min"})) // добавляем новый файл style.min.css для сжатия
		.pipe(csso()) // сжимаем style.min.css
		.pipe(dest(path.css.dest, { sourcemaps: app.isDev })) // передаем файловый поток для записи
}

module.exports = css; // экспортируем задачу