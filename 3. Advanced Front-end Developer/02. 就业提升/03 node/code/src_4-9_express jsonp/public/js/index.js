const callback = (str) => {
  console.log(str)
}

// 动态创建script标签
const jsonp = (url) => {
  const script = document.createElement("script")
  script.src = url
  document.body.appendChild(script)
  script.onload = () => { script.remove() }
}

jsonp("http://localhost:5003/api/student")