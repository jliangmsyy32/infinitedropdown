import { data } from './data';
import { ChineseDistricts as CD } from './citydata';
import { infinitedropdown as idd } from './main';

var a = new idd({
  selector: '.am-idd',
  data: CD,
  init: 86,
  showTooltip: true,
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

idd({
  selector:'.addClass',
  data: CD,
  init: 86,
  defaultValue:[510000,510100],
  showTooltip: true,
  className: 'custom-css',
});


var getData = document.getElementById('getData')
getData.onclick = function() {
  let allData =''
  for(let i=0; i<a.data.length; i++) {
    allData += a.data[i].value + ' - ' + a.data[i].text + ' \n'
  }
  alert(allData)
}
