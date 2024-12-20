文件系统模块fs

1. 使用require导入使用

    ```js
    //  引入 fs 模块
    const fs = require('fs')
    console.log(fs)
    ```

2. 常用的方法：
    读文件：readFile
    写文件：writeFile（覆盖原内容）， appendFile（追加内容）

    ```js
    const fs = require('fs')
    
    fs.readFile('./a.txt', 'utf-8', (err, data) => {
      console.log(err)
      console.log(data)
    })
    
    fs.writeFile("./2.txt", 'haha123', (err) => {
      console.log(err)
    })
    
    fs.appendFile('3.txt', "-000", (err) => {
      console.log(err)
    })
    ```

    