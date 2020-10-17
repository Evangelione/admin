import Vue from 'vue'

export default {
  // 读取地区
  district: id => {
    if (id) {
      return Vue.axios.get(`/v1/districts/${id}`)
    } else {
      return Vue.axios.get('/v1/districts')
    }
  },
}
