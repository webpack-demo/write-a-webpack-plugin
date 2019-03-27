/**
 * 打包的时候输出 filelist.md，列出打包文件
 */
class myPlugin {
  constructor(options) {
    // 可以输出 new myPlugin({name: 'fish', age: 30}) 传入的对象
    console.log(options)
  }
  // apply 方法，注入 compiler 对象
  apply (compiler) {
    // compiler 对象挂载 webpack 相应事件钩子
    // 事件钩子的回调函数里能拿到编译后的 compilation 对象，如果是异步钩子还能拿到相应的 callback
    compiler.hooks.emit.tapAsync('myPlugin', (compilation, callback) => {
      let filelist = 'In this build:\n\n'

      for (let filename in compilation.assets) {
        filelist += `- ${filename}\n`
      }

      compilation.assets['filelist.md'] = {
        source () {
          return filelist
        },
        size () {
          return filelist.length
        }
      }

      // 当该插件功能完成以后一定要注意回调 callback 函数
      callback()
    })
  }
}

module.exports = myPlugin
