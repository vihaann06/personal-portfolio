const { createProxyMiddleware } = require('http-proxy-middleware');

/** Proxy Spotify API calls to the local dev server during `npm start`. */
module.exports = function setupProxy(app) {
  app.use(
    '/api/spotify',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: () => '/api/spotify',
    }),
  );
};
