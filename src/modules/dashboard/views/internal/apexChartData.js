// colors
const chartColors = {
  column: {
    series1: '#826af9',
    series2: '#d2b0ff',
    bg: '#f8d3ff',
  },
  success: {
    shade_100: '#7eefc7',
    shade_200: '#06774f',
  },
  donut: {
    series1: '#fc0303',
    series2: '#ffe700',
    series3: '#0314fc',
    series4: '#00fc37',
    series5: '#6f42c1',
    series5: '#e83e8c',
  },
  area: {
    series3: '#a4f8cd',
    series2: '#60f2ca',
    series1: '#2bdac7',
  },
}

export default {
  donutChart: {
    series: [],
    chartOptions: {
      legend: {
        show: true,
        position: 'bottom',
        fontSize: '14px',
        fontFamily: 'Montserrat',
      },
      colors: [
        chartColors.donut.series1,
        chartColors.donut.series5,
        chartColors.donut.series3,
        chartColors.donut.series2,
      ],
      dataLabels: {
        enabled: true,
        formatter(val) {
          // eslint-disable-next-line radix
          return `${parseInt(val)}`
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: '2rem',
                fontFamily: 'Montserrat',
              },
              value: {
                fontSize: '1rem',
                fontFamily: 'Montserrat',
                formatter(val) {
                  // eslint-disable-next-line radix
                  return `${parseInt(val)}`
                },
              },
              total: {
                show: true,
                fontSize: '1.5rem',
                label: '',
                formatter() {
                  return ''
                },
              },
            },
          },
        },
      },
      labels: [],
      responsive: [
        {
          breakpoint: 992,
          options: {
            chart: {
              height: 380,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
        {
          breakpoint: 576,
          options: {
            chart: {
              height: 320,
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    name: {
                      fontSize: '1.5rem',
                    },
                    value: {
                      fontSize: '1rem',
                    },
                    total: {
                      fontSize: '1.5rem',
                    },
                  },
                },
              },
            },
            legend: {
              show: true,
            },
          },
        },
      ],
    },
  },
}
