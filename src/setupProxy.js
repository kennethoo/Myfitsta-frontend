const createProxyMiddleware = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://myfitsta-backend.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
