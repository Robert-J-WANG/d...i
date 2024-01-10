// 获取dom
var sProvince = $("#province");
var sCity = $("#city");
var sSchool = $("#school");
/* ----------------------- 1. 初始化 ----------------------- */
// 动态渲染省份数据到selector
init();
/* ------------------------ 2. 交互 ----------------------- */
// 2.1 根据省份选择城市
// 点击select，内容变化时，注册事件，生成城市列表
sProvince.addEventListener("change", createCitys);
// 2.2 根据城市选择学校
sCity.addEventListener("change", createSchools);

/**
 * 初始化页面的函数
 */
function init() {
  // 根据province对象数据，创建省份option数据列表
  createOptions(province, sProvince);
}

function createCitys() {
  // 先清除城市列表
  if (sCity.innerHTML !== '<option value="0000">请选择</option>') {
    sCity.innerHTML = '<option value="0000">请选择</option>';
  }
  // 先清除学校列表
  if (sSchool.innerHTML !== '<option value="0000">请选择</option>') {
    sSchool.innerHTML = '<option value="0000">请选择</option>';
  }
  for (key in city) {
    if (key === this.value) {
      createOptions(city[key], sCity);
    }
  }
}

function createSchools() {
  // 先清除学校列表
  if (sSchool.innerHTML !== '<option value="0000">请选择</option>') {
    sSchool.innerHTML = '<option value="0000">请选择</option>';
  }
  for (key in allschool) {
    if (key === this.value) {
      createOptions(allschool[key], sSchool);
    }
  }
}

/**
 * 动态创建option的函数
 * @param {*} obj option列表对象
 * @param {*} select 将创建的option列表添加到的select标签节点
 */
function createOptions(obj, select) {
  for (key in obj) {
    var option = document.createElement("option");
    option.value = key;
    option.innerText = obj[key];
    select.appendChild(option);
  }
}

function $(selector) {
  return document.querySelector(selector);
}
