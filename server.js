const express = require("express");
const path = require("path");

const app = express();
const PORT = 9000;

// 静态资源目录（用于存放打包后的前端文件）
app.use(express.static(path.join(__dirname, "build")));

// 首页路由
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// 分页列表路由
app.get("/page", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// 电影详情页路由
app.get("/film/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行：http://localhost:${PORT}`);
});