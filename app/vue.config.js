module.exports = ({
  transpileDependencies: true,
  lintOnSave: false,
  //代理跨域，解决跨域问题
  devServer: {
    proxy: {
      '/api': {
        target: "http://gmall-h5-api.atguigu.cn",//要跨域的目的ip
        // pathRewrite: { '^/api': '' }
      }
    },
    //解决报错：vue 报错：WebSocket connection to ‘ws://192.168.51.116:3000/ws‘ failed:
    host: '0.0.0.0',
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },

})
