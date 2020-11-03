import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/axios'
import '@/plugins/element'
import '@/plugins/validator'
import '@/plugins/map'
import '@/common/lib'

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {}
  },
  methods: {
    _goBack() {
      this.$router.go(-1)
    },
    _message(message = '操作成功', callback = () => {}) {
      this.$message(message)
      callback()
    },
  },
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
