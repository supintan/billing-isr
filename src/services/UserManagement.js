import Service from '@/services/ServiceConfig'

class UserManagement {
  Handling = error => Service.Handling(error)
}

export default new UserManagement()
