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
 * [create description]
 * @param  {[type]} name    [description]
 * @param  {[type]} options [description]
 * @param  {[type]} node    [description]
 * @return {[type]}         [description]
 */
export function create(name,options,node) {
  let select = document.createElement('select');
  let content = '';
  select.name = name;
  for(let i=0; i<options.length; i++) {
    content += `<option value=${options[i][1]}>${options[i][0]}</option>`
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

    array.pop()

  while( last.name !== name && last.nodeType === 1) {
    node.removeChild(last);
    if( last.name !=='init' ) {
      array.pop()
    }
    last = node.lastChild;
  }
}

// two ways to delete dom
