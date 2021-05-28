const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware ({
            target:"ec2-54-180-135-68.ap-northeast-2.compute.amazonaws.com:5000",
            changeOrigin: true,
        })
    );
};