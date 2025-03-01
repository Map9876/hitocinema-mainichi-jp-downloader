const path = require("path");

module.exports = {
  mode: "development", // 设置为开发模式
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/", // 确保静态资源路径正确
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource", // 处理图片资源
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // 静态资源目录
    },
    compress: true,
    port: 9000,
  },
};