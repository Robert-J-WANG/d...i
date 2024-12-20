//  引入 fs 模块
const fs = require('fs')
// console.log(fs)

// 读文件
// fs.readFile('./a.txt', 'utf-8', (err, data) => {
//   console.log(err)
//   console.log(data)
// })

fs.readFile('./c.js', 'utf-8', (err, data) => {
  console.log(err)
  console.log(typeof data, data)
})

// 写文件
// fs.writeFile('./b.txt', 'world', (err) => {
//   console.log(err)
// })

// 追加文件
fs.readFile('./b.txt', 'utf-8', (err, data) => {
  if (!err) {
    fs.writeFile('./b.txt', data + "123 - ", (err) => {
      console.log(err)
    })
  }
})

