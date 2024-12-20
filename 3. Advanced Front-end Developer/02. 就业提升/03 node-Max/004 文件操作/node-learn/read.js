const fs = require('fs')
// console.log(fs)

fs.readFile('./1.txt', 'utf-8', (err, data) => {
  console.log(err)
  console.log(data)
})