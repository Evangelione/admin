import Vue from 'vue'
import dayjs from 'dayjs'

Vue.prototype.$parseDate2Str = (date, format) => {
  format = format || 'YYYY-MM-DD HH:mm:ss'
  return dayjs(date).format(format)
}
