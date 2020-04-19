import Vue from 'vue'
import moment from 'moment'

Vue.filter('dataFormat', function(value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(formatStr)
})
