import Vue from 'vue'
import HeaderTop from 'components/Common/HeaderTop'

let Cc = [HeaderTop]

Cc.forEach(component => {
  Vue.component(component.name, component)
})
