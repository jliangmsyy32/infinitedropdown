'use strict';
import { data } from './data.js';
import create from './create';
import { ChineseDistricts as CD } from './citydata';
import { clean } from './clean.js';

function idd({
  node = 'idd',
  data = false, // 指定载入的数据，不提供AJAX的方法； 提供多个实例。
  init = 1, // required
  showTooltip = true, // 是否显示指示，无占位符直接获取第一个数据
  tooltip = ['设置提示信息'],
  defaultValue = [], // 默认值，给出层级结构，提高搜索效率
}) {
  // console.log(node,data,defaultValue);
  let iddNode = document.querySelector(node);
  let allSelect = [];

  // init tooltip information
  // if(showTooltip) {
  //   for(let i=0; i<tooltip.length; i++) {
  //     let a = [];
  //     a.push([tooltip[i],1]);
  //     if(i===0) {
  //       a.concat(first)
  //     }
  //     console.log(a);
  //     create(i,a,iddNode);
  //   }
  // }

/**
 * get data from data , return array
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
  function loop(value) {
    let arr = [];
    for(let items in data[value]) {
      arr.push([data[value][items],items])
    }
    return arr;
  }

  let first = loop(init);
  first.unshift(['--占位--',1]);
  allSelect.push(init);
  create('init',first,iddNode);

  function render(event) {
    let target = event.target || event.srcElement;
    if(target.nodeName.toUpperCase() === 'SELECT') {
      let index = target.selectedIndex;
      let value = target.options[index].value;
      console.log(target.name,'curName');
      if( target.name !== 'init') {
        clean(target.name,iddNode);  // 保证一个异步的过程，得清除完毕才能继续下一步，考虑到很多级的时候。
      }
      target.name = value; // 修改当前select的name
      console.log(target.name,'changeName');
      // console.log(index,value);
      let data = loop(value);
      // console.log('length',data.length)
      if( data.length ) {
        data.unshift(['--占位符--',1]);
        allSelect.push(value);
        create('init',data,iddNode)
      }
    }
    console.log(allSelect)
  }

  // 事件监听，通过change事件触发数据的刷新
  iddNode.addEventListener('change',render,false);

}

// trigger enent
idd({
  node:'.am-idd',
  data: CD,
  init:86,
  showTooltip:true,
  tooltip:['这是','提示','条哦']
})


// 保存已选的数据，
