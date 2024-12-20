const fs = require('fs')

fs.writeFile("./2.txt", 'haha123', (err) => {
  console.log(err)
})