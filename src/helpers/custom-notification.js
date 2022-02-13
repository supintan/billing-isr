import Vue from 'vue'
const vm = new Vue

export default {
  name: 'CustomNotification',
  functional: true,
  notif(type, title, body) {
    vm.$bvToast.toast(body, {
      title: title,
      variant: type,
      solid: true
    })
  },
}
