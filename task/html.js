const { src, dest } = require("gulp"); // подключение пакета GULP

// Конфигурация
const path = require("../config/path.js"); // добавляем пути из файла path.js

// Плагины
const fileinclude = require("gulp-file-include"); // возможность шаблонизации
const plumber = require("gulp-plumber"); // перехват ошибок
const notify = require("gulp-notify"); // позволяет создавать различные всплывающие сообщения
const webpHtml = require("gulp-webp-html"); // добавляет тег <picture> для изображений

// Обработка HTML
const html = () => {
	return src(path.html.src) // передаем путь до исходных файлов с помощью метода src
		.pipe(plumber({ // обработка ошибок + редактирование уведомления
			errorHandler: notify.onError(error => ({
				title: "HTML",
				message: error.message
			}))
		}))
		.pipe(fileinclude()) // возможность шаблонизации
		.pipe(webpHtml()) // добавляем webp + <picture>
		.pipe(dest(path.html.dest)) // передаем файловый поток для записи
}

module.exports = html; // экспортируем задачу