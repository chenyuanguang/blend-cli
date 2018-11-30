export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$tools', {
      value: 'utils'
    })
  }
}
