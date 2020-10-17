import Vue from 'vue'

export default {
  // 读取用户订单信息列表
  merchant: id => Vue.axios.get(`/merchants/${id}`),
  merchantList: params =>
    Vue.axios.get('/merchants', {
      params,
    }),
  createMerchant: payload =>
    Vue.axios.post('/merchants', {
      ...payload,
    }),
}
