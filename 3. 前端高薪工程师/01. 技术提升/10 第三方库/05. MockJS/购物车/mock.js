Mock.mock("https://mock/api/cart", "get", {
  code: 0, // 无错误
  msg: "", // 错误消息
  "data|5-10": [
    // 主体数据
    {
      productName: "@csentence(4,10)", // 商品名称
      productUrl: "@image(120x60, #fff)", // 商品图片url地址
      "unitPrice|10-199.2": 0, // 商品单价
      "count|1-10": 0, // 购物数量
    },
  ],
});
