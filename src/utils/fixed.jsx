// 定义修改根标签字体的代码.用于适配
function adapter() {
  const rootFz = (document.documentElement.clientWidth * 100) / 375;
  document.documentElement.style.fontSize = rootFz + "px";
}

adapter();

window.onresize = adapter;

//适配移动端边框一像素问题
var viewport = document.querySelector("meta[name=viewport]");
var scale = 1 / window.devicePixelRatio;
viewport.setAttribute("content", "width=device-width,initial-scale=" + scale);
var res = parseInt(document.documentElement.style.fontSize);
document.documentElement.style.fontSize = res * window.devicePixelRatio + "px";
