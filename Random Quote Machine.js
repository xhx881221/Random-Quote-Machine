//声明变量，主要是DOM，声明颜色的取值范围。
var quote_text = document.getElementById("quote_text");
var quote_author = document.getElementById("quote_author");
var quote_new = document.getElementById("quote_new");
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var body = document.getElementsByTagName("body")[0];
var button = document.getElementsByClassName("button");
var button_arr = Array.from(button);
var text = document.getElementsByClassName("text")[0];
var author = document.getElementsByClassName("author")[0];
//声明回调处理函数，将返回的JSON数据类型按需显示。同时完成颜色改变等工作
function callback(response) {
  var color = colors[Math.floor(Math.random() * colors.length)];
  //通过getComputedStyle获得元素body的样式集合，再取出其中的background-color作为初始颜色。
  var initialColor = window.getComputedStyle(body)["background-color"];
  quote_text.innerHTML = response.hitokoto;
  quote_author.innerHTML = response.from;
  body.animate([
    {backgroundColor: initialColor},
    {backgroundColor: color},
  ], 1000);
  //当动画完成之后，会默认的恢复至初始状态，所以在结束时，要将样式重写一次。
  body.style.backgroundColor = color;
  button_arr.forEach(function(element) {
    element.animate([
      {backgroundColor: initialColor},
      {backgroundColor: color},
    ], 1000);
    element.style.backgroundColor = color;
  })
  text.animate([
    {color: initialColor},
    {color: color},
  ], 1000);
  text.style.color = color;
  author.animate([
    {color: initialColor},
    {color: color},
  ], 1000);
  author.style.color = color;
  //获取数据之后，在进行动画。
  text_show.play();
  author_show.play();
}

//通过JSONP的方式，实现跨域
function get_quote() {
  var script = document.createElement("script");
  script.src = "https://v1.hitokoto.cn/?c=c&encode=json&callback=callback";
  document.body.insertBefore(script, document.body.firstChild);
}

//两个动画函数，在声明动画函数之后，将其暂停，好方便控制
var text_show = quote_text.animate([
  {opacity: 0},
  {opacity: 1},
], {
  duration: 1000,
});
text_show.pause();
var author_show = quote_author.animate([
  {opacity: 0},
  {opacity: 1},
], {
  duration: 1000,
});
author_show.pause();

//页面加载完成之后，再进行跨域，然后赋予各个按钮作动的函数
window.addEventListener("load", function() {
  get_quote();
  quote_new.addEventListener("click", get_quote);
  button[0].addEventListener("click", function() {
    window.open("https://weibo.com/");
  });
  button[1].addEventListener("click", function() {
    window.open("https://login.weixin.qq.com/");
  })
});