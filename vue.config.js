module.exports = {
    devServer: {
        proxy: {
            '/index': {
                target: 'http://www.fruit-end.com',
                ws: true,
                changeOrigin: true
            }
        }
    }
};