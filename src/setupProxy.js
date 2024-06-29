// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://qa.irix.in:5858",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // remove /api prefix when forwarding the request
      },
    })
  );
};
