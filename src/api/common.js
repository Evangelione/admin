import Vue from 'vue'

export default {
  // 读取地区
  getDistrictList: id => {
    if (id) {
      return Vue.axios.get(`/districts/${id}`)
    } else {
      return Vue.axios.get('/districts')
    }
  },
  // 读取分类
  getCategoryList: id => {
    if (id) {
      return Vue.axios.get(`/categories/${id}`)
    } else {
      return Vue.axios.get('/categories')
    }
  },
}
