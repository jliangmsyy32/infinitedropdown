'use strict';
import { data } from './data';
import { loop,create,clean } from './utils';
import { ChineseDistricts as CD } from './citydata';

function idd({
  selector = 'idd', // required
  data = false, // required.指定载入的数据，不提供AJAX的方法； 提供多个实例。
  init = 1, // required
  showTooltip = true, // optional,是否显示指示，无占位符直接获取第一个数据
  tooltip = '设置提示信息', // optional, 替换默认的提示信息
  defaultValue = false, // optional，以数组给出接入，
  className = '', // optional, 样式接口
  callback = '', // optional, 设置回调函数，每次选择后触发回调函数。
}) {
  // console.log(node,data,defaultValue);
  let iddNode = document.querySelector(selector);
  let allSelect = [];

/**
 * [get Index ]
 * @param  {[NUmber/String]} code [the code of value]
 * @param  {[type]} dataset  [description]
 * @param  {[type]} data  [description]
 * @return {[type]}       [description]
 */
  function getIndex(code,dataset,data) {
    let a = 0;
    console.log(code,' code')
    for( let items in data[dataset]) {
        a ++;
        console.log(items)
        if(items == code ) {
            console.log('found')
            return a;
        }
    }
    console.log('no data found')
    return false;
  }

  let first = loop(init,data);
  let firstIndex;
  if(defaultValue ) {
    firstIndex = getIndex(defaultValue[0],init,data)
  }
  first.unshift([tooltip,1]);
  // allSelect.push(init);
  let initNode = create(init,first,iddNode);
  initNode.selectedIndex = firstIndex;
  console.log(firstIndex)

  if(defaultValue) {
    defaultValue.forEach((items)=>{
        let dataBack = loop(items,data)
        let nodeBack = create('init',dataBack,iddNode)
        let index = getIndex(items,)
    })
  }


  function render(event) {
    let target = event.target || event.srcElement;
    if(target.nodeName.toUpperCase() === 'SELECT') {
      let index = target.selectedIndex;
      let value = target.options[index].value;
      let text = target.options[index].text;
      console.log('当前选择: ',text);
      let values = {};
      values.value = value;
      values.text = text;
      if( target.name !== 'init') {
        clean(target.name,iddNode,allSelect);
      }
      target.name = value;
      allSelect.push(values);
      let dataset = loop(value,data);
      if( dataset.length ) {
        dataset.unshift([tooltip,1]);
        create('init',dataset,iddNode)
      }
      if( typeof callback) {
        console.log(callback)
        callback();
      }
    }
    console.log('已选择数据: ',allSelect)
  }
  // 事件监听，通过change事件触发数据的刷新
  iddNode.addEventListener('change',render,false);
  return allSelect;
}

// trigger event
// var a = new idd({
//   selector:'.am-idd',
//   data: CD,
//   init:86,
//   showTooltip:true,
//   tooltip:'-- 你说了算 --'
// })


idd({
  selector:'.testNode',
  data: data,
  init: 1,
  showTooltip: true,
  defaultValue: [10],
  callback: foo,
})
function foo() {
  console.log('111111')
}
