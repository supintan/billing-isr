class InputFormat {
  // Variable
  format = {
    creditCard: {
      creditCard: true,
    },
    date: {
      date: true,
      delimiter: '-',
      datePattern: ['Y', 'm', 'd'],
    },
    phone: {
      phone: true,
      phoneRegionCode: 'US',
    },
    time: {
      time: true,
      timePattern: ['h', 'm', 's'],
    },
    number: {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      numeralDecimalScale: 5,
      numeralDecimalMark: ',',
      delimiter: '.',
      numeralPositiveOnly: true,
    },
  }

  constructor(value) {
    this.value = value
  }

  // Method
  NumberFormat(number) {
    this.value = number
    if (this.value) {
      return Number(this.value).toLocaleString('in-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 5,
      })
    }
    return '-'
  }

  options(option) {
    this.value = option
    if (this.value) return this.format[this.value]
    return null
  }

  convNumString(number) {
    this.value = number
    let newValue = 0

    if (this.value) {
      if (this.value !== null && this.value.length > 0) {
        const newValue1 = this.value.replaceAll('.', '')
        newValue = newValue1.replaceAll(',', '.')
      }
    }
    return newValue
  }

  convHepengString(number) {
    this.value = number
    let newValue = 0

    if (this.value) {
      if (this.value !== null && this.value.length > 0) {
        const newValue1 = this.value.replaceAll('.', ',')
        newValue = newValue1.replaceAll(',', '.')
      }
    }
    return newValue
  }

  HepengRupiahString(number) {
    this.value = number
    let newValue = 0

    if (this.value) {
      if (this.value !== null && this.value.length > 0) {
        const newValue1 = this.value.replaceAll('.00000', '')
        newValue = newValue1.replaceAll(',', '.')
      }
    }
    return newValue
  }
}

export default new InputFormat()
