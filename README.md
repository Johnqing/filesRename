文件批量重命名
===========


## 安装
```
npm install filesrename
```

## 使用

```
var rename = require('filesrename');

rename.init(function(fname, dir, dirname){
	// 把包含 - 的替换为 _
	return fname.replace('-', '_');
});

```



