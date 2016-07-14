'use strict';

export default function create(name,options,node) {
  let select = document.createElement('select');
  let content = '';
  select.name = name;
  for(let i=0; i<options.length; i++) {
    content += `<option value=${options[i][1]}>${options[i][0]}</option>`
  }
  select.innerHTML = content;
  node.appendChild(select);
}


// 是使用DOM对象的方法还是 用 innerHTML这种。
