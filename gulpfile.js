const { watch, series, parallel } = require("gulp"); // Подключение пакета GULP
const browserSync = require("browser-sync").create();

// Конфигурация
const path = require("./config/path.js");
const app = require("./config/app.js");

// Задачи
const clear = require('./task/clear.js'); // задача по очистке директории public
const html = require('./task/html.js'); // задача по работе с HTML
// const css = require('./task/css.js'); // задача по работе с CSS
const scss = require('./task/scss.js'); // задача по работе с SCSS
const js = require('./task/js.js'); // задача по работе с JS
const img = require('./task/img.js'); // задача по работе с изображениями
const font = require('./task/font.js'); // задача по работе со шрифтами

// Сервер
const server = () => {
	browserSync.init({
		server: {
			baseDir: path.root
		}
	});
}

// Наблюдение
const watcher = () => {
	watch(path.html.watch, html).on("all", browserSync.reload);
	watch(path.scss.watch, scss).on("all", browserSync.reload);
	watch(path.js.watch, js).on("all", browserSync.reload);
	watch(path.img.watch, img).on("all", browserSync.reload);
	watch(path.font.watch, font).on("all", browserSync.reload);
}

// Сборка для продакшена
const build = series(
	clear,
	parallel(html, scss, js, img, font)
);

// Сборка для разработки
const dev = series(
	build,
	parallel(watcher, server)
);

// Отдельный вызов задач
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;

exports.default = app.isProd
	? build // если true
	: dev; // иначе