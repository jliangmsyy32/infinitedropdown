'use strict';

/**
 * get data from data , return array
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export function loop(value,data) {
    let arr = [];
    for(let items in data[value]) {
      arr.push([data[value][items],items])
    }
    return arr;
  }

/**
 * [judge content, create description]
 * @param  {[type]} name    [description]
 * @param  {[type]} options [description]
 * @param  {[type]} node    [description]
 * @return {[type]}         [return current node just created]
 */
export function create(name,optionsContent,node) {
  if(optionsContent.length < 2) {
    console.log('NO INCOMING DATA');
    return false;
  }
  let select = document.createElement('select');
  let content = '';
  select.name = name;
  for(let i=0; i<optionsContent.length; i++) {
    content += `<option value=${optionsContent[i][1]}>${optionsContent[i][0]}</option>`
  }
  select.innerHTML = content;
  node.appendChild(select);
  return select;
}

/**
 * [clean old selected data and old select]
 * @param  {[type]} name [description]
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
export function clean(name,node,array) {
  // let a = document.querySelector(`select[name=${name}]`);
  let last = node.lastChild;
  array.pop();
  while( last.name !== name && last.nodeType === 1) {
    node.removeChild(last);
    if( last.name !=='init' ) {
      array.pop()
    }
    last = node.lastChild;
  }
  return true;
}

// two ways to delete dom

/**
 * detect if the value is definied and type is the same as we give
 * @param  {[**]} value [data]
 * @param  {[String]} type  [the data type you want to check]
 * @return {[Boolean]}
 */
export function dataCheck(value,type) {
  let clas = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  console.log(clas,'你的数据类型');
  if( value && clas === type.toLowerCase() ) {
    return true;
  } else {
    console.log('默认值设置错误');
    return false;
  }
}

/**
 * [get Index ]
 * @param  {[NUmber/String]} code [the code of value]
 * @param  {[type]} dataset  [description]
 * @param  {[type]} data  [description]
 * @return {[Number]}       [return the index number]
 */
export function getIndex(code,dataset,data) {
  let a = 0;
  for( let items in data[dataset]) {
      a ++;
      if(items == code ) {
          return a;
      }
  }
  console.log('no data found')
  return false;
}
