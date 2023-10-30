const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
  //,
  //devServer: {
  //  proxy: 'http://172.21.0.4:4000/'
  //} 
})
