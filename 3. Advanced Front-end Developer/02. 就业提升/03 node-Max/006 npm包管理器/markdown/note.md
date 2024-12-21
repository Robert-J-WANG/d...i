npm 包管理的使用

1. npm是node packages manager,无需单独安装，安装node.js的时候会自动安装

2. 使用 help查看命令

    ```bash
    npm help
    ```

3. 常用的命令

    1. init (初始化设置node项目，并生成配置文件package.json)

        ```bash
        npm init
        ```

        ```json
        
        {
          "name": "learn",
          "version": "1.0.0",
          "description": "",
          "main": "index.js",
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          "author": "",
          "license": "ISC"
        }
        ```

        其中，可以配置"scripts"项，自定义项目执行的脚本命令

        ```json
         ...
         "scripts": {
        	...
            "dev":"node a.js"
          },
          ...
        ```

        这样就是看使用 `npm run dev` 运行a.js文件了

    2. 其他：

        install （安装包）

        uninstall （卸载包）
