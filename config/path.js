const pathSrc = "./src"; // путь до директории с исходными файлами
const pathDest = "./public"; // путь до директории для конечных файлов

module.exports = {
	root: pathDest, // Если понадобится доступ к корню конечных файлов

	html: {
		src: pathSrc + "/html/*.html", // маска исходных файлов
		watch: pathSrc + "/html/**/*.html", // маска для отслеживания
		dest: pathDest // для конечных файлов
	},

	css: {
		src: pathSrc + "/css/*.css", // маска исходных файлов
		watch: pathSrc + "/css/**/*.css", // маска для отслеживания
		dest: pathDest + "/css" // для конечных файлов
	},

	scss: {
		src: pathSrc + "/sass/*.{sass,scss}", // маска исходных файлов
		watch: pathSrc + "/sass/**/*.{sass,scss}", // маска для отслеживания
		dest: pathDest + "/css" // для конечных файлов
	},

	js: {
		src: pathSrc + "/js/*.js", // маска исходных файлов
		watch: pathSrc + "/js/**/*.js", // маска для отслеживания
		dest: pathDest + "/js" // для конечных файлов
	},

	img: {
		src: pathSrc + "/img/*.{jpg,jpeg,png,gif,svg}", // маска исходных файлов
		watch: pathSrc + "/img/**/*.{jpg,jpeg,png,gif,svg}", // маска для отслеживания
		dest: pathDest + "/img" // для конечных файлов
	},

	font: {
		src: pathSrc + "/font/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}", // маска исходных файлов
		watch: pathSrc + "/font/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}", // маска для отслеживания
		dest: pathDest + "/font" // для конечных файлов
	}
}