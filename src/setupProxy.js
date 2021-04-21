const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ltapi',
    createProxyMiddleware({
      target: 'http://localhost/wp-json/',
      changeOrigin: true,
    })
  );
};