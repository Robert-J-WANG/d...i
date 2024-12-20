const fs = require('fs')

fs.appendFile('3.txt', "-000", (err) => {
  console.log(err)
})