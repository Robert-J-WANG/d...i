js 模块化

1. 类似浏览器提供了很多内置API（比如document， location，history）， node也提供了很多内置模块（比如fs）

2. js的模块化：不同的功能代码封装成不同的代码片段（函数，js文件等），之间导入导出相互使用

3. 模块化语法规范：
    1. 社区版commonJS
    2. 官方版ECMAScript Module (ESM)

4. node中使用CommonJS规范

    1. node中每个文件都是一个模块

    2. node给每个模块提供一个模块化相关的对象module

        ```js
        console.log(module)
        
        /* Module {
          id: '.',
          path: '/Users/aqiang/...',
          exports: {},
          filename: '/Users/aqiang/.../m1.js',
          loaded: false,
          children: [],
          paths: []
        } */
        ```

        **module对象的exports属性，用来导出模块**

    3. CommonJS导出模块 **（使用module.exports）**

        ```js
        const user = {
          name: "jimmy",
          age: 18
        }
        
        module.exports = { user }
        ```

    4. CommonJS导入模块 **（使用require）**

        ```js
        const { user } = require('./common_ex.js')
        
        console.log('name - ' + user.name, 'age - ' + user.age)
        ```

5. node中使用ESM规范

    1. 导入import

        ```js
        const user = {
          name: 'Robert',
          age: 18
        }
        
        export { user }
        ```

    2. 导出export

        ```js
        import { user } from './ex.js'
        
        console.log('name - ' + user.name, 'age - ' + user.age)
        ```

    注意： nodejs默认使用commonJS规范（ESM规范出现的太晚），使用ESM规范是需要配置

    ​	 ***Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.***

    3. 配置package.json

        创建文件package.json

        ```json
        {
          "type": "module"
        }
        ```

    4. 导入导出模块时，使用变量别名

        ```js
        const user = {
          name: 'Robert',
          age: 18
        }
        export { user as student }
        ```
        
        ```js
        // 使用变量别名
        import { student as s } from './ex.js'
        console.log('name - ' + s.name, 'age - ' + s.age)
        ```
    
    5. 默认导出： 使用**default**，把所有内容看成一个整体使用
    
        ```js
        const user = {
          name: 'Robert',
          age: 18
        }
        
        // 默认导出
        export default user
        ```
        
        ```js
        // 默认导入
        import student from './ex.js'
        console.log('name - ' + student.name, 'age - ' + student.age)
        ```

