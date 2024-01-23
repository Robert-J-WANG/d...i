function $(select) {
  return document.querySelector(select);
}
function $$(select) {
  return document.querySelectorAll(select);
}
var doms = {
  video: $("video"),
  controls: $$(".controls"),
  current: $(".current"),
  total: $(".total"),
  range: $('input[type="range"]'),
  btnPlay: $("#btnPlay"),
  btnRates: $$("#rate button"),
  volume: $("#volume"),
  save: $("#save"),
  load: $("#load"),
};

// 初始化
// 视频加载完成，显示自定义的控件
doms.video.addEventListener("loadeddata", init);
function init() {
  //1. 显示自定义的控件
  doms.controls.forEach((control) => (control.style.display = "block"));
  // 2. 初始化进度条
  setRange();
  // 3. 初始化播放速率
  setRate();
  // 4. 初始化音量
  setVolume();
}
// 交互
// 点击播放暂停
doms.btnPlay.onclick = function () {
  if (doms.video.paused) {
    // 播放视频
    doms.video.play();
    // 更新进度条
    doms.video.ontimeupdate = function () {
      setRange();
    };
  } else {
    doms.video.pause();
  }
};
// 点击进度条
doms.range.oninput = function () {
  var total = doms.video.duration;
  current = (this.value * total) / 100;
  doms.video.currentTime = current;
  // 更新进度条
  setRange();
};
// 点击播放速率-  不起作用？？？？
doms.btnRates.forEach((btn) => {
  btn.onclick = function () {
    console.log(doms.video.playbackRate);
    var rate = btn.dataset.rate;
    doms.video.playbackRate = +rate;
    setRate();
  };
});

doms.volume.querySelector("input").oninput = function () {
  console.log(this.value);
  if (this.value === 0) {
    doms.video.muted = true;
  }
  doms.video.volume = this.value / 100;
  setVolume();
};

doms.save.addEventListener("click", function () {
  var obj = {
    currentTime: doms.video.currentTime,
    rate: doms.video.playbackRate,
    volume: doms.video.volume,
  };
  var json = JSON.stringify(obj);
  localStorage.setItem("vdo", json);
  alert("保存设置成功");
});

doms.load.addEventListener("click", function () {
  var json = localStorage.getItem("vdo");
  var obj = JSON.parse(json);
  doms.video.currentTime = obj.currentTime;
  doms.video.playbackRate = obj.rate;
  doms.video.volume = obj.volume;

  setRange();
  setRate();
  setVolume();
  doms.video.play();
});

function setRange() {
  var current = doms.video.currentTime;
  var total = doms.video.duration;
  doms.current.innerText = getTime(current);
  doms.total.innerText = getTime(total);
  doms.range.value = Math.floor((current * 100) / total) + "";
}

function setRate() {
  var rate = doms.video.playbackRate;
  var activeBtn = $("#rate button.active");
  if (activeBtn) {
    activeBtn.classList.remove("active");
  }
  doms.btnRates.forEach((btn) => {
    if (btn.dataset.rate === rate + "") {
      btn.classList.add("active");
    }
  });
}

function setVolume() {
  var volume = Math.floor(doms.video.volume * 100); //100
  if (doms.video.muted) {
    volume = 0;
  }
  doms.volume.querySelector("input[type='range']").value = volume;
  doms.volume.querySelector("span").innerText = volume + "%";
}

function getTime(time) {
  var h = Math.floor(time / 3600);
  var m = Math.floor((time % 3600) / 60);
  var s = Math.floor((time % 3600) % 60);
  return `${fomateTime(h)} : ${fomateTime(m)} : ${fomateTime(s)}`;
}
function fomateTime(time) {
  return (time = time < 10 ? `0${time}` : time);
}
