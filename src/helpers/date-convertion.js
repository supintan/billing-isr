import moment from 'moment'

export default {
  convert(value = null) {
    moment.locale('ID')

    if (value) {
      this.value = new Date(value)
    } else {
      this.value = new Date()
    }

    if (this.value !== null) {
      return moment(this.value).format(this.format)
    }
    return '-'
  },

  setValue(value) {
    this.value = value
    return this
  },

  setFormat(format) {
    let newFormat = null
    switch (format) {
      case 'date':
        newFormat = 'D MMMM YYYY'
        break
      case 'system':
        newFormat = 'YYYY-MM-DD H:mm:s'
        break
      case 'year':
        newFormat = 'YYYY'
        break
      case 'month-date':
        newFormat = 'MM-DD'
        break
      default:
        newFormat = 'D MMMM YYYY H:i:s'
        break
    }
    this.format = newFormat
    return this
  },

  getTimeNow() {
    return this.setFormat('system').convert()
  },

  getYear() {
    return moment(this.value).format('YYYY')
  },

  getDateMonth() {
    return moment(this.value).format('MM-DD')
  },

  getYearMonthDate() {
    return moment(this.value).format('YYYY-MM-DD')
  },

  reverseMonthDate(date) {
    const year = this.getYear()
    return moment(`${date}-${year}`).format('YYYY-MM-DD')
  },

  getFullDate() {
    return moment(this.value).format('D MMMM YYYY')
  },

  getFullDateTime() {
    return moment(this.value).format('D MMMM YYYY HH:mm:ss')
  },

  addDate(number, type) {
    return moment(this.value).add(number, type).format('YYYY-MM-DD')
  },

  minDate(number, type) {
    return moment(this.value).subtract(number, type).format('YYYY-MM-DD')
  },

  calculateApplicationPeriod(period, returnArray = false) {
    if (period) {
      const lengthVal = period.length
      const type = period.substr(lengthVal - 1, 1)

      let newType = ' '
      let typeName = ''
      let typeCode = ''
      switch (type) {
        case 'Y':
          newType += 'Tahun'
          typeName = 'year'
          typeCode = 'y'
          break
        case 'M':
          newType += 'Bulan'
          typeName = 'month'
          typeCode = 'm'
          break
        case 'D':
          newType += 'Hari'
          typeName = 'day'
          typeCode = 'd'
          break
        default:
          newType += 'N/A'
          typeName = ''
      }

      if (!returnArray) return period.replace(type, newType)

      return {
        periode: period.substr(0, lengthVal - 1),
        type: typeName,
        typeCode,
      }
    }
    return 'N/A'
  },

  test() {
    return 'axa'
  },
}
