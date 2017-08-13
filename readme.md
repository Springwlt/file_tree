###  js Api 文档预览系统
- 读取js文档中的注释，用html格式展现。
### 使用的技术
- vue的[树形视图](https://cn.vuejs.org/v2/examples/tree-view.html)

- format-json

- markdown-browser-0.6.0-beta1

- esprima-extract-comments

```javascript
var extract = require('esprima-extract-comments');
extract('// this is a code comment');
```

### run project
```javascript
npm start
```