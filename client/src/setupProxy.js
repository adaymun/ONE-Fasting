const { createProxyMiddleware } = require('http-proxy-middleware');
  // This proxy configuration forwards any request starting with '/api'
  // to the backend server on port 5001, stripping the '/api' prefix.
  module.exports = function(app) {
   app.use(
   '/api',
   createProxyMiddleware({
   target: 'http://localhost:5001',
   changeOrigin: true,
   logLevel: 'debug',
   pathRewrite: { '^/api': '' } // Removes '/api' so /api/fasting/plans becomes /fasting/plans
   })
   );
  };