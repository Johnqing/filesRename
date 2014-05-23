var path = require('path');
var fs = require('fs');

// 脚本地址
var cwd = process.cwd();
var script_url = __filename;
var script_name = path.basename(script_url);

var renameObj = {
	replace: function(){},
	init: function(fn){
		this.replace = fn;
		if(typeof fn != 'function'){
			throw new Error('Callback must be a function!');
		}
		// 
		this.readdirs(cwd);
	},
	rename: function(url){
		var that = this;
		// 获取文件名
		var fname = path.basename(url);
		var dir = path.dirname(url);
		var dirname = path.basename(dir);
		// fixed: 把当前脚本名替换掉
		if(fname != script_name){
			var newname = that.replace(fname, dir, dirname);
			if(!newname)
				throw new Error('Must be returned to you want to name!');

			var newUrl = dir + path.sep + newname;
			fs.rename(url, newUrl);
			console.log(newUrl + ' is done!');
		}

	},
	statfile: function(url){
		var that = this;
		fs.stat(url, function(err, stats){
			// 递归文件夹 
			if(stats.isDirectory()){
				that.readdir.call(that, url);
				return;
			}
			// 文件
			if(stats.isFile()){
				that.rename.call(that, url);
			}
		});
	},
	readdirs: function(dir){
		var that = this;
		// 读取后的内容处理
		function rd(err, files){

			files.forEach(function(file){
				var url = dir + path.sep + file;
				that.statfile.call(that, url);
			});


		}

		// 读取该路径下的内容
		fs.readdir(dir, rd);
	}
}

module.exports = renameObj;