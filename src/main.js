'use strict';
import { data } from './data';
import { loop,create,clean,getIndex,dataCheck } from './utils';
import { ChineseDistricts as CD } from './citydata';

function idd({
  selector = 'idd', // required
  data = false, // required.指定载入的数据，不提供AJAX的方法； 提供多个实例。
  init = 1, // required
  showTooltip = true, // optional,是否显示指示，无占位符直接获取第一个数据
  tooltip = '请设置提示信息', // optional, 替换默认的提示信息;多个提示信息就循环数组进行替换
  defaultValue = false, // optional，以数组给出接入，
  className = '', // optional, 样式接口
  callback = false, // optional, 设置回调函数，每次选择后触发回调函数。
}) {

  let iddNode = document.querySelector(selector);
  let allSelect = []; // for storing selected data

  let first = loop(init,data); // get initialization
  let initNode;  // init first node
  first.unshift([tooltip,1]);

  if(!defaultValue && dataCheck(first,'array')) {
    initNode = create(init,first,iddNode);  // 设置了默认值后是不同的
  } else if( dataCheck(defaultValue,'array') ) {
      // 有默认值时， 初始化
      let firstIndex;
      initNode = create(defaultValue[0],first,iddNode);
      firstIndex = getIndex(defaultValue[0],init,data);
      initNode.selectedIndex = firstIndex;
      let values = {};
      values.value = defaultValue[0];
      values.text = initNode.options[firstIndex].text;
      allSelect.push(values);

      // 多个默认值的循环
      defaultValue.forEach((items,i,arr)=>{
        let dataBack = loop(items,data);
        dataBack.unshift([tooltip,1]);
        let nodeBack;
        let index;
        // let nodeBack = create('init',dataBack,iddNode);
        let nextIs = arr[i+1];

        let values = {};

        if(nextIs) {
          index = getIndex(arr[i+1],items,data);
          nodeBack = create(nextIs,dataBack,iddNode);
          nodeBack.selectedIndex = index;

          values.value = nextIs;
          values.text = nodeBack.options[index].text;
          allSelect.push(values);
          console.log(allSelect)
        } else {
          create('init',dataBack,iddNode);
        }
    })
  }

/**
 * [when selected, trigger render function]
 * @param  {[type]} event [description]
 * @return {[Array]}       [the selects's data]
 */
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
      dataset.unshift([tooltip,1]);
      create('init',dataset,iddNode)

      // 回调函数接口
      if( callback) {
        console.log(callback)
        callback();
      }
    }

    console.log('已选择数据: ',allSelect)
  }
  // 事件监听，通过change事件触发数据的刷新
  iddNode.addEventListener('change',render,false);

  // 暴露公共接口
  return {
    data:allSelect,
  }
}

// ================================================================

// trigger event
var a = new idd({
  selector: '.am-idd',
  data: CD,
  init: 86,
  showTooltip: true,
  defaultValue: [510000,510100],
  tooltip: '-- 你说了算 --'
})

idd({
  selector:'.testNode',
  data: data,
  init: 1,
  showTooltip: true,
  defaultValue: [10,103],
});

idd({
  selector:'.noDefault',
  data: data,
  init: 1,
  showTooltip: true,
});

var getData = document.getElementById('getData')
getData.onclick = function() {
  let allData =''
  for(let i=0; i<a.data.length; i++) {
    allData += a.data[i].value + ' - ' + a.data[i].text + ' \n'
  }
  alert(allData)
}
