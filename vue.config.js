module.exports = {
  devServer: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8081,
    // proxy: 'http://localhost:8010',
  }
}
