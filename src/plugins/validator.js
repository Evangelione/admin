import Vue from 'vue'

const Validator = {
  required: { required: true, message: '该项是必填的', trigger: 'blur' },
  url: { type: 'url', message: '请输入正确的url', trigger: 'blur' },
  phone: {
    validator: (rule, value, callback) => {
      console.log(value)
      if (new RegExp(/^[1][3-9][0-9]{9}$/).test(value)) {
        callback()
      }
      callback(new Error('请填写正确的电话号码'))
    },
    trigger: 'blur',
  },
  email: { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
  decimal1: {
    validator: (rule, value, callback) => {
      if (new RegExp(/^(([0-9]+)|(([0]\.\d?|[1-9][0-9]*\.\d?)))$/).test(value)) {
        callback()
      }
      callback(new Error('最多支持1位小数'))
    },
    trigger: 'blur',
  },
  decimal2: {
    validator: (rule, value, callback) => {
      if (new RegExp(/^(([0-9]+)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/).test(value)) {
        callback()
      }
      callback(new Error('最多支持2位小数'))
    },
    trigger: 'blur',
  },
}

Validator.install = function(Vue) {
  Vue.prototype.$validator = Validator
}

Vue.use(Validator)
