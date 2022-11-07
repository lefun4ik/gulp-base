const del = require("del"); // подключаем плагин del

// Конфигурация
const path = require("../config/path.js"); // добавляем пути из файла path.js

// Удаление директории
const clear = () => {
	return del(path.root);
}

module.exports = clear; // экспортируем наружу