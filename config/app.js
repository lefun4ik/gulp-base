const isProd = process.argv.includes("--production"); // при запуске с аргументом --production в эту переменную запишется true, иначе - false
const isDev = !isProd;

module.exports = {
	isProd: isProd,
	isDev: isDev,

	webpack: {
		mode: isProd ? "production" : "development"
	},

	imagemin: {
		verbose: true
	},

	fonter: {
		formats: ["ttf", "woff", "eot", "svg"]
	}
}