const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber"); // перехват ошибок
const notify = require("gulp-notify"); // позволяет создавать различные всплывающие сообщения
const imagemin = require("gulp-imagemin"); // позволяет оптимизировать изображения
const newer = require("gulp-newer"); // игнорирует уже сжатые изображения
const webp = require("gulp-webp"); // конвертация изображений в формат WEBP
const gulpIf = require("gulp-if"); // плагин для определения режима с помощью условия

// Обработка изображений
const img = () => {
	return src(path.img.src) // Возвращаем задаче поток
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: "Image",
				message: error.message
			}))
		}))
		.pipe(newer(path.img.dest)) // фильтр уже сжатых или изменённых изображений
		.pipe(webp()) // конвертер в webp
		.pipe(dest(path.img.dest)) // передаем файловый поток для записи
		.pipe(src(path.img.src)) // возвращаем задаче поток
		.pipe(newer(path.img.dest)) // фильтр уже сжатых или изменённых изображений
		.pipe(gulpIf(app.isProd, imagemin(app.imagemin))) // отимизируем изображения, если режим продакшена
		.pipe(dest(path.img.dest)) // передаем файловый поток для записи
}

module.exports = img; // экспортируем задачу