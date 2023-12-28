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

1. 根据设计稿，分析导航区布局结构

    ![1](assets/topNav1.png)

2. 编写顶部导航区html，使用通用样式类名和自定义顶部导航类名

    ```html
    <!-- 头部导航栏 -->
      <div class="topNav">
        <div class="container clearfix">
          <!-- 左侧部分 -->
          <ul class="fl topNav-menu">
            <li class="fl"><a href="">小米商城</a></li>
            <li class="fl"><a href="">MIUI</a></li>
            <li class="fl"><a href="">IoT</a></li>
            <li class="fl"><a href="">云服务</a></li>
            <li class="fl"><a href="">天星数科</a></li>
            <li class="fl"><a href="">有品</a></li>
            <li class="fl"><a href="">小爱开放平台</a></li>
            <li class="fl"><a href="">企业团购</a></li>
            <li class="fl"><a href="">资质证照</a></li>
            <li class="fl"><a href="">协议规则</a></li>
            <li class="fl"><a href="">下载app</a></li>
            <li class="fl"><a href="">智能生活</a></li>
            <li class="fl"><a href="">Select Location</a></li>
          </ul>
          <!-- 右侧部分 -->
          <div class="fr">
            <!-- 登录注册通知部分 -->
            <ul class="fl topNav-menu">
              <li class="fl"><a href="">登录</a></li>
              <li class="fl"><a href="">注册</a></li>
              <li class="fl"><a href="">消息通知</a></li>
            </ul>
            <!-- 购物车部分 -->
            <div class="fr"></div>
          </div>
        </div>
      </div>
    ```

3. 根据设计文稿，获取样式数据

    ![2](assets/topNav2.png)

4. 编写顶部导航区样式

    ```css
    /* topNav.css文件中编写 */
    
    .topNav {
      background: #333;
      height: 40px;
      color: #b0b0b0;
      font-size: 12px;
    }
    .topNav-menu {
      line-height: 40px;
    }
    .topNav-menu a {
      padding: 0 7px;
      border-right: 1px solid #424242;
    }
    .topNav-menu li:last-child a{
      border-right: none;
    }
    .topNav-menu li:first-child a{
      padding-left: 0;
    }
    .topNav-menu a:hover{
      color: #fff;
    }
    ```



### 	[03. 顶部导航-购物车](https://www.youtube.com/watch?v=zZqlaWVORAo&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=17)

1. 根据设局图分析购物车部分结构

    ![2](assets/topNav3.png)

2. 编写html结构

    ```html
     <!-- 购物车部分 -->
            <div class="fl topNav-car">
              <!-- 购物车图标部分 -->
              <a href="" class="topNav-link">
                <i class="iconfont i-car"></i>
                <span>购物车(0)</span>
              </a>
              <!-- 鼠标hover时，显示的部分 -->
              <div class="topNav-detail">
                <span>购物车中还没有商品，赶紧选购吧！</span>
              </div>
    
    ```

3. 根据设计文稿，获取样式数据

    ![1](assets/topNav4.png)

4. 编写购物车样式

    ```css
    /* 购物车部分 */
    .topNav-car {
      width: 128px;
      height: 40px;
      background-color: #424242;
      margin-left: 13px;
      position: relative;
    }
    .topNav-link {
      width: 100%;
      height: 100%;
      display: block;
      text-align: center;
      line-height: 40px;
    }
    .topNav-detail{
      width: 320px;
      height: 100px;
      background-color: #fff;
      color: #ccc;
      text-align: center;
      line-height: 100px;
      border: 1px solid #333;
      position: absolute;
      right: 0;
      top: 40px;
      border-top: 0;
      display: none;
      /* 
      对z-index层级的约定：
      弹出菜单，使用2位数；
      固定菜单，使用1位数 
      */
      z-index: 11;
    }
    
    .topNav-car:hover .topNav-detail{
      display: block;
    }
    
    .topNav-car:hover .topNav-link{
      background-color: #fff;
    }
    ```
    
    备注：防止类名冲突，应该使用多层级类名
    
    ```html
     <a href="" class="topNav-link"> 
         <!-- 而不是 -->
      <a href="" class="link">
    ```
    
    

### 	[04. 头部-Logo和菜单](https://www.youtube.com/watch?v=H1DSo3lqNvg&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=8)

1. 根据设局图分析结构

    ![2](assets/header1.png)

2. 编写html结构

    ```html
      <!-- 头部菜单开始 -->
      <div class=" header">
        <div class="container clearfix">
          <!-- logo -->
          <a href="" class="header-logo fl">
            <h1>小米商城</h1>
          </a>
          <!-- 菜单 -->
          <div class="header-menu fl">
            <a class="fl" href="">小米手机</a>
            <a class="fl" href="">红米手机</a>
            <a class="fl" href="">电视</a>
            <a class="fl" href="">笔记本</a>
            <a class="fl" href="">平板</a>
            <a class="fl" href="">家电</a>
            <a class="fl" href="">路由器</a>
            <a class="fl" href="">服务</a>
            <a class="fl" href="">社区</a>
          </div>
          <!-- 搜索 -->
        </div>
      </div>
      <!-- 头部菜单结束 -->
    ```

    

3. 根据设计文稿，获取样式数据

    ![2](assets/header2.png)

4. 编写样式: header.css文件中编写

    ```
    .header{
      height: 100px;
      /* background-color: lightskyblue; */
      line-height: 100px;
    }
    .header-logo h1{
      display: none;
    }
    .header-logo{
      width: 56px;
      height: 56px;
      /* outline: 1px solid ; */
      margin-top: 22px;
      margin-right: 172px;
      background-image: url(../img/logo.png);
      background-size: 100% 100%;
    }
    
    .header-menu a{
      padding: 0 7px;
      font-size: 16px;
    }
    ```

    

### 	[05. 头部-二级菜单](https://www.youtube.com/watch?v=OaS2K4iNcBM&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=9)

1. 根据设局图分析结构

    ![2](assets/header3.png)

2. 编写html结构

    ```html
     <!-- 头部菜单开始 -->
      <div class=" header">
        <div class="container clearfix">
          <!-- logo -->
          <a href="" class="header-logo fl">
            <h1>小米商城</h1>
          </a>
          <!-- 菜单 -->
          <div class="header-menu fl">
            <a class="fl" href="">小米手机</a>
         	...省略...
            <a class="fl" href="">社区</a>
    
            <!-- 二级菜单区域 -->
            <div class="header-submenu">
              <div class="container clearfix">
                <!-- 二级菜单 列表项 -->
                <a href="" class="fl">
                  <div class="cover">
                    <img src="./img/product.webp" alt="">
                    <div class="name">Redmi Note 11 5G</div>
                    <div class="price">1199元起</div>
                  </div>
                </a>
    
         		... 共6个...
    
              </div>
            </div>
          </div>
          <!-- 搜索 -->
        </div>
      </div>
      <!-- 头部菜单结束 -->
    ```

    

3. 根据设计文稿，获取样式数据

    ![2](assets/header4.png)

4. 编写样式: header.css文件中编写

    ```css
    /* topNav.css文件中编写 */
    /* 给topNav添加相对定位 */
    .topNav {
      background: #333;
      height: 40px;
      color: #b0b0b0;
      font-size: 12px;
      /* 这里是设置二级菜单定位的参考系 */
      position: relative;
    }
    
    
    /* header.css文件中编写 */
    /* 鼠标hover，显示2级菜单 */
    .header-menu:hover .header-submenu{
      display: block;
    }
    /* 二级菜单 */
    .header-submenu{
      /* 注意：这里是相对于TopNav */
      position: absolute;
      /* background-color: #e23737; */
      left: 0;
      top: 140px;
      width: 100%;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 30px 0;
      display: none;
    }
    
    .header-submenu .cover{
      width: 204px;
      text-align: center;
      
    }
    .header-submenu .cover img{
      width: 160px;
      height: 110px;
      border-right: 1px solid #eee;
    }
    
    .header-submenu a:last-child .cover img{
      border-right: 0;
    }
    
    .header-submenu .cover .name{
      margin-top: 10px;
    }
    
    .header-submenu .cover .price{
      color: #ff6700;
    }
    ```

    

### [06. 头部-搜索区域](https://www.youtube.com/watch?v=zLKQ0YYhJ1I&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=10)

1. 根据设局图分析结构

    ![2](assets/search1.png)

2. 编写html结构

    ```html
    <!-- 搜索 -->
          <!-- 收集表单数据，使用form标签 -->
          <form class="header-search fr">
            <!-- 这里input标签不建议在包裹一层div,为了聚焦时，方便通过兄弟伪元素获取后面的元素 -->
            <input  type="text" class="fl" placeholder="手机" >
            <button type="button" class="search-icon fl">
              <i class="iconfont i-fangdajing"></i>
            </button>
            <div class="search-suggestion">
              <a href="">全部商品</a>
              <a href="">手机</a>
              <a href="">耳机</a>
              <a href="">笔记本</a>
            </div>
          </form>
    ```

    

3. 根据设计文稿，获取样式数据

    ![2](assets/search2.png)

4. 编写样式: header.css文件中编写

    ```css
    /* search区域 */
    .header-search{
      margin-top: 25px;
      /* background: #6cdb04; */
      position: relative;
    }
    .header-search input{
      width: 245px;
      height: 50px;
      outline: none;
      border: 1px solid #ccc;
      padding: 0 15px;
      font-size: 16px;
    }
    .header-search input:hover{
      border: 2px solid #aaa;
    }
    .header-search .search-icon{
      width: 50px;
      height: 50px;
      border: 1px solid #ccc;
      border-left: 0;
      font-size: 20px;
      color: #565656;
      cursor: pointer;
    }
    .header-search .search-icon i{
      font-size: inherit ;
    }
    .header-search .search-icon:hover{
      background-color: #ff6700;
      border: none;
      color: white;
    }
    .header-search .search-suggestion{
      position: absolute;
      left: 0;
      top: 50px;
      width: 245px;
      border: 1px solid #ff6700;
      border-top: 0;
      display: none;
    }
    .header-search .search-suggestion a{
      display: block;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
    }
    .header-search .search-suggestion a:hover{
      background-color: #eee;
      color: inherit;
    }
    .header-search input:focus{
      border: 1px solid #ff6700;
    }
    .header-search input:focus~.search-suggestion{
      display: block;
    }
    .header-search input:focus~.search-icon{
      border: 1px solid #ff6700;
      border-left: 0;
    }
    ```

    

### [07. 横幅-主区域](https://www.youtube.com/watch?v=6xN_z9fwlf4&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=11)

### [08. 横幅-菜单](https://www.youtube.com/watch?v=XbR62vX-lBI&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=18)

### [09. 横幅2](https://www.youtube.com/watch?v=l1M20aY_9jY&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=19)

### [10. 主区域-广告](https://www.youtube.com/watch?v=a8S352n9kH0&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=20)

### [11. 主区域-橱窗](https://www.youtube.com/watch?v=udvHCUDU-_Y&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=21)

### [12. 页脚](https://www.youtube.com/watch?v=wDhjGE1XjVI&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=22)

### [13. 右侧固定菜单](https://www.youtube.com/watch?v=lOmbTBfUamY&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=23)

### [14. 右侧二维码弹出](https://www.youtube.com/watch?v=Yxu8kmrxbss&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=24)

### [15. 将你的页面分享给全世界](https://www.youtube.com/watch?v=AYo5FWk0vBY&list=PLRxJGZOBxjTNIhex5oh44bl9QH2R7AuXl&index=25)
