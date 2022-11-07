const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js");  // добавляем пути из файла path.js
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber"); // перехват ошибок
const notify = require("gulp-notify"); // позволяет создавать различные всплывающие сообщения
const babel = require("gulp-babel"); // подключаем Babel
const uglify = require("gulp-uglify"); // минифицируем файл JS
// const webpack = require("webpack-stream"); // подключаем webpack, если надо

// Обработка JS
const js = () => {
	return src(path.js.src, { sourcemaps: app.isDev }) // передаем путь до исходных файлов с помощью метода src
		.pipe(plumber({ // обработка ошибок + редактирование уведомления
			errorHandler: notify.onError(error => ({
				title: "JS",
				message: error.message
			}))
		}))
		.pipe(babel())
		// .pipe(webpack(app.webpack))
		.pipe(uglify())
		.pipe(dest(path.js.dest, { sourcemaps: app.isDev })) // передаем файловый поток для записи
}

module.exports = js; // экспортируем задачу