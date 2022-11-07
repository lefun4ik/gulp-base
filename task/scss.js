const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js"); // добавляем пути из файла path.js
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber"); // перехват ошибок
const notify = require("gulp-notify"); // позволяет создавать различные всплывающие сообщения
const autoprefixer = require("gulp-autoprefixer"); // автопрефиксер
const csso = require("gulp-csso"); // сжатие стилей в конечном файле
const rename = require("gulp-rename"); // изменение имени файла
const groupCssMediaQueries = require("gulp-group-css-media-queries"); // группировка медиазапросов
const sass = require("gulp-sass")(require("sass")); // плагин gulp-sass + компилятор SASS
const webpCss = require("gulp-webp-css"); // добавляет тег <picture> для изображений
const sassGlob = require("gulp-sass-glob"); // импортирует файлы с помощью масок

// Обработка SCSS
const scss = () => {
	return src(path.scss.src, { sourcemaps: app.isDev }) // возвращаем задаче поток
		.pipe(plumber({ // обработка ошибок + редактирование уведомления
			errorHandler: notify.onError(error => ({
				title: "SCSS",
				message: error.message
			}))
		}))
		.pipe(sassGlob()) // импортируем файлы
		.pipe(sass()) // добавляем поддержку SASS
		.pipe(webpCss()) // добавляем webp + @supports
		.pipe(autoprefixer()) // добавляем префиксы для браузеров
		.pipe(groupCssMediaQueries()) // группируем медизапросы
		.pipe(dest(path.scss.dest, { sourcemaps: app.isDev })) // передаем файловый поток для записи
		.pipe(rename({ suffix: ".min"})) // добавляем новый файл *.min.css для сжатия
		.pipe(csso()) // сжимаем *.min.css
		.pipe(dest(path.scss.dest, { sourcemaps: app.isDev })) // передаем файловый поток для записи
}

module.exports = scss; // экспортируем задачу