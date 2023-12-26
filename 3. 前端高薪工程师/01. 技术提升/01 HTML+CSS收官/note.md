## 01 HTML+CSS收官

### [01. 补充重要知识](https://www.youtube.com/watch?v=m-47rcPYSXk)

1. 仿脱发神器：设置通用样式, 盒模型为border-box

    ```css
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      /* 这样盒子的款和高尺寸将包含margin，padding以及border尺寸 */
    }
    .box {
      width: 200px;
      height: 200px;
      background-color: lightpink;
      margin: 20px;
      padding: 20px;
      border: 10px solid lightgreen;
      /* 外边框尺寸不参加计算 */
      outline: 1px solid ; 
    }
    /* 盒子内容的实际尺寸是140px x 140px */
    ```

2.  颜色的alpha通道

    - 颜色的alpha通道标识了颜色的透明度，他是一个0~1之间的取值。0表示完全透明，1表示完全不透明
    - 在css中使用rgba为颜色添加alpha通道

    ```css
    .rgba{
      /* 使用alpha通道控制 */
      color: rgba(16, 72, 240, 0.5);
    
      /* 使用opacity控制 */
      /* color: rgb(11, 23, 242);
      opacity: 0.5; */
    }
    ```

    -   alpha通道 比opacity更精确;

    -  opacity控制整盒子，包括背景颜色和文字颜色
    -  rgba能控制单个属性。比如只控制文字颜色 */

3. 尺寸的百分比

    - 绝大部分可以书写尺寸的地方，都可以书写百分比
    - 百分比是一个相对单位，其相对与元素的**参考系**，比如：
    - **普通元素**的参考系：**父元素的内容区域**（不包含margin，padding，border）
    - **绝对（固定）定位元素**的参考系：父元素中**第一个定位元素的==包含padding区域==**
    - ==常见百分比的情况==

    | css属性 | 百分比相对于     | 备注                                                         |
    | ------- | ---------------- | ------------------------------------------------------------ |
    | Width   | 参考系的**宽度** |                                                              |
    | Height  | 参考系的**高度** | 参考系（父元素）高度受本身（这个子元素）宽度影响时，设置无效。只有父元素的高度不受这个子元素是否存在而影响时，才能给这个子元素使用百分比 |
    | Padding | 参考系的**宽度** | 不常用                                                       |
    | Margin  | 参考系的**宽度** | 不常用                                                       |
    | Border  | 参考系的**宽度** | 不常用                                                       |

4. 最大最小宽度

    - 最大宽度：max-width， 最大高度：max-height
    - 最小宽度：min-width，最小高度：min-height
    - 当一个元素的尺寸会自动变化时，设置最大最小宽高，可以让他不至于变的过小或者过大
    - 实际开发中，通常给PC端页面设置一个最小宽度，通常次宽度为设计稿的宽度

    ```css
    html{
      min-width: 1226px;
    }
    ```

    - 给页面中的所有图片设置一个最大宽度。让图片不超过容器

    ```css
    img{
      max-width: 100%;
    }
    ```

    

### [02. 表单进阶-HTML](https://www.youtube.com/watch?v=PKY5WT5P9NU)

### [03. 表单进阶-CSS.mp4](https://www.youtube.com/watch?v=_bHQTzIvMpY)

### [04. 精灵图](https://www.youtube.com/watch?v=6sCslBcSV_Q)

### [05. 绝对定位收官](https://www.youtube.com/watch?v=h8V7RPASnzg)

### [06. 属性值的计算过程](https://www.youtube.com/watch?v=KVpn7qpefDo)

### [07. 拓展知识](https://www.youtube.com/watch?v=g2_QMpHHDYg)

#### 	

