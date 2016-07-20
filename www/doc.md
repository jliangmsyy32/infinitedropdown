# infiniteDropdown

infinite dropdown

# USAGE

## Installation

USE npm: `npm install --save infinitedropdown`

## Usage

simply include
```js
<script src="/path/to/infinitedropdown.min.js">
```
or

if you use webpack or module loaders:
```js
// CommonJS
var idd = require('infinitedropdown');

// ES2015
import idd from 'infinitedropdown';
```

config:
```js
var idd = infinitedropdown({
  selector = '.am-idd', // required 默认.am-idd
  data = false, // required 指定载入的数据
  init = false, // required 数据初始位置
  showTooltip = true, // optional 是否显示指示信息
  tooltip = '请设置提示信息', // optional 替换默认的提示信息
  defaultValue = false, // optional 下拉框设定默认值
  className = '', // optional 给select增加样式名
  callback = false, // optional 设置回调函数，每次选择后触发回调函数
  })
```
html:
```html
<div class="am-idd"></div>
```

## required data structure

data structure like hash(structure is simple and clear)

```js
const data = {
  1: {
    10: '水果',
    20: '蔬菜',
  },
  10: {
    100: '苹果',
    101: '香蕉',
  },
  20: {
    200: '土豆',
    201: '大蒜',
    202: '茄子',
  },
  100: {
    1000: '苹果一种',
    1001: '苹果两种',
  },
  101: {
    1010: '香蕉1',
    1011: '香蕉2',
  },
}
```

## DEMO

DEMO1:
`````html
<h1>InfiniteDropdown</h1>
<h1>load city data:</h1>
<div class="am-idd"></div>
<button id="getData">获取数据</button>
`````
```js
var a = new idd({
  selector: '.am-idd',
  data: CD,
  init: 86,
  showTooltip: true,
  tooltip: '-- 你说了算 --'
})
```
DEMO2:
`````html
<h1>load custom data</h1>
<div class="noDefault"></div>
`````
```js
var b= idd({
  selector:'.testNode',
  data: data,
  init: 1,
  showTooltip: true,
});
```
DEMO3:
`````html
<h1>set default value</h1>
<div class="testNode"></div>
`````
```js
var c = idd({
  selector:'.noDefault',
  data: data,
  init: 1,
  showTooltip: true,
});
```
DEMO4:
`````html
<h1>add custom css</h1>
<div class="addClass"></div>
`````
```js
var d = infinitedropdown({
  selector:'.addClass',
  data: CD,
  init: 86,
  defaultValue:[510000,510100],
  showTooltip: true,
  className: 'custom-css',
});
```
