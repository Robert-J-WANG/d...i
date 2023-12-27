## 02 HTML+CSS项目实战

### 	[01. 搭建工程](https://www.youtube.com/watch?v=71aRpqQI2-A&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=15)

1. 创建项目文件夹

    1. 准备项目图片素材
    2. 创建首页index文件，并引入favicon图标
    3. 创建css文件夹，并创建通用样式表common.css，引入到html文件中

2. 编写通用样式: common.css中编写

    1. 统一样式

    ```css
    /* 通用的css代码 */
    * {
      margin: 0;
      padding: 0;
      list-style: none;
      box-sizing: border-box;
    }
    *::before,
    *::after {
      box-sizing: border-box;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    a:hover {
      color: #ff6700;
    }
    html {
      color: #333;
      min-width: 1226px;
      font: 14px/1.5 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei',
        'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
    }
    ```

    2. 浮动样式

    ```css
    /* 浮动处理 */
    .fl {
      float: left;
    }
    .fr {
      float: right;
    }
    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }
    ```

    3. 通用容器样式

    ```css
    /* 通用容器 */
    .container {
      width: 1226px;
      margin-left: auto;
      margin-right: auto;
    }
    ```

    

3. 准备字体图标的引入

    - 这部分属于CSS3的知识，现阶段只需要知道如何使用即可
    - 在页面所有样式之前引入一个CSS
        - [https://at.alicdn.com/t/font_2960521_rqz39d8moo.css](https://gitee.com/link?target=https%3A%2F%2Fat.alicdn.com%2Ft%2Ffont_2960521_rqz39d8moo.css)
    - 打开「字体图标.html」找到自己想使用的图标，复制它对应的类样式
    - 设置任何一个元素的类样式为：iconfont + 对应的图标类样式 即可
        - 学会设置图标的大小、颜色

    

    

### 	[02. 顶部导航-主区域](https://www.youtube.com/watch?v=PFPCxY6ociE&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=16)

### 	[03. 顶部导航-购物车](https://www.youtube.com/watch?v=zZqlaWVORAo&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=17)

### 	[04. 头部-Logo和菜单](https://www.youtube.com/watch?v=H1DSo3lqNvg&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=8)

### 	[05. 头部-二级菜单](https://www.youtube.com/watch?v=OaS2K4iNcBM&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=9)

### [06. 头部-搜索区域](https://www.youtube.com/watch?v=zLKQ0YYhJ1I&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=10)

### [07. 横幅-主区域](https://www.youtube.com/watch?v=6xN_z9fwlf4&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=11)

### [08. 横幅-菜单](https://www.youtube.com/watch?v=XbR62vX-lBI&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=18)

### [09. 横幅2](https://www.youtube.com/watch?v=l1M20aY_9jY&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=19)

### [10. 主区域-广告](https://www.youtube.com/watch?v=a8S352n9kH0&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=20)

### [11. 主区域-橱窗](https://www.youtube.com/watch?v=udvHCUDU-_Y&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=21)

### [12. 页脚](https://www.youtube.com/watch?v=wDhjGE1XjVI&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=22)

### [13. 右侧固定菜单](https://www.youtube.com/watch?v=lOmbTBfUamY&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=23)

### [14. 右侧二维码弹出](https://www.youtube.com/watch?v=Yxu8kmrxbss&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=24)

### [15. 将你的页面分享给全世界](https://www.youtube.com/watch?v=AYo5FWk0vBY&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=25)
