import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/common/axios'
import VueAxios from 'vue-axios'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

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
