'use strict';
import { loop,create,clean,getIndex,dataCheck } from './utils';

export function infinitedropdown({
  selector = '.am-idd', // required 节点名称
  data = false, // required 指定载入的数据
  init = false, // required 数据初始位置
  showTooltip = true, // optional 是否显示指示信息
  tooltip = '请设置提示信息', // optional 替换默认的提示信息
  defaultValue = false, // optional 下拉框设定默认值
  className = '', // optional 给select增加样式名
  callback = false, // optional 设置回调函数，每次选择后触发回调函数
}) {

  if(!selector || !data || !init) {
    console.log('configuration')
  }
  let iddNode = document.querySelector(selector);
  let allSelect = []; // for storing selected data

  let first = loop(init,data); // get initialization
  let initNode;  // init first node
  first.unshift([tooltip,1]);

  if(!defaultValue && dataCheck(first,'array')) {
    initNode = create(init,first,iddNode,className);
  } else if( dataCheck(defaultValue,'array') ) {
      let firstIndex;
      initNode = create(defaultValue[0],first,iddNode,className);
      firstIndex = getIndex(defaultValue[0],init,data);
      initNode.selectedIndex = firstIndex;
      let values = {};
      values.value = defaultValue[0];
      values.text = initNode.options[firstIndex].text;
      allSelect.push(values);

      defaultValue.forEach((items,i,arr)=>{
        let dataBack = loop(items,data);
        dataBack.unshift([tooltip,1]);
        let nodeBack;
        let index;
        let nextIs = arr[i+1];
        let values = {};

        if(nextIs) {
          index = getIndex(arr[i+1],items,data);
          nodeBack = create(nextIs,dataBack,iddNode,className);
          nodeBack.selectedIndex = index;

          values.value = nextIs;
          values.text = nodeBack.options[index].text;
          allSelect.push(values);
          console.log(allSelect)
        } else {
          create('init',dataBack,iddNode,className);
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
      create('init',dataset,iddNode,className)

      // callback function
      if( callback) {
        console.log(callback)
        callback();
      }
    }

    console.log('已选择数据: ',allSelect)
  }

  iddNode.addEventListener('change',render,false);

  // public hook
  return {
    data:allSelect,
  }
}
