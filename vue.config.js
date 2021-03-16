module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.graphql$/,
          use: 'graphql-tag/loader'
        }
      ]
    }
  }
  
}
