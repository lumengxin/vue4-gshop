import Vue from 'vue'
import HeaderTop from 'components/Common/HeaderTop'
import StarScore from 'components/Common/StarScore'
import AlertTip from 'components/Common/AlertTip'

let Cc = [HeaderTop, StarScore, AlertTip]

Cc.forEach(component => {
  Vue.component(component.name, component)
})
