'use strict';
function loop(value) {
  let arr = [];
  for(let items in data[value]) {
    arr.push([data[value][items],items])
  }
  return arr;
}
