import Vue from 'vue'

export default {
  // 读取用户订单信息列表
  getMerchantInfo: id => Vue.axios.get(`/merchants/${id}`),
  getMerchantList: params =>
    Vue.axios.get('/merchants', {
      params,
    }),
  createMerchant: payload =>
    Vue.axios.post('/merchants', {
      ...payload,
    }),
}
