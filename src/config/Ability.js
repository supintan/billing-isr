import { Ability } from '@casl/ability'
// import FetchAbility from '@/services/Ability'
// import CustomNotification from '@/helpers/custom-notification'

// const newAbility = FetchAbility
// .getData()
// .then(result => result)
// .catch(error => {
//   if (error.response) {
//     CustomNotification.notif('error', 'Error! Memperbaharui ability', `Mohon cek Jaringan [Error Code: ${error.response.status}]`)
//   } else {
//     CustomNotification.notif('error', 'Error! Memperbaharui ability', 'Mohon cek Jaringan')
//   }
// })

// const axa = newAbility.then(result => result)

export default new Ability([
  {
    action: 'manage',
    subject: 'all',
  },
])
