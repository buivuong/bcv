var bower_dir = __dirname + '/bower_components';
var node_dir = __dirname + '/node_modules';
var lib_dir = __dirname + '/libs';

var webpack = require('webpack');
var path = require('path');

var config = {
	addVendor: function (name, path) {
		this.resolve.alias[name] = path;
		this.module.noParse.push(new RegExp(path));
	},
	entry: {
		web: './client/main.js'
	},
	resolve: {
		root: path.resolve(__dirname),
		modulesDirectories: ['node_modules', 'client'],
		alias: {} 
	},
	output: {
		path: './build',
		filename: '[name].bundle.js'
	},
	module: {
		noParse: [],
    	loaders: [
      		{ test: /\.js$/, loader: 'jsx-loader' },
      		{ test: /\.css$/, loader: 'style-loader!css-loader' },
      		{ test: /\.woff|woff2$/,   loader: "url-loader?prefix=font/&limit=100000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "url-loader?prefix=font/" },
            { test: /\.eot$/,    loader: "url-loader?prefix=font/" },
            { test: /\.svg$/,    loader: "url-loader?prefix=font/" },
			{include: /\.json$/, loaders: ["json-loader"]},
			{ test: /is_js/, loader: "imports?define=>undefined" }
    	]
 	},
	resolve: {
		extensions: ['', '.json', '.jsx', '.js']
	},
 	plugins: [
        new webpack.ProvidePlugin({
			"Q": "q",
			"moment": "moment-timezone",
			"async": "async",
			"Cookies": "cookies-js",
			"is": "is_js"
        })
    ]
};

module.exports = config;