'use strict';

export function clean(name,node) {
  // let a = document.querySelector(`select[name=${name}]`);
  let last = node.lastChild;
  console.log(last);
  console.log(last.name,name);
  if( last.nodeType ==1 ) {
    while( last.name !== name) {
      node.removeChild(last);
      last = node.lastChild;
    }
  }
}

// two ways to delete dom
