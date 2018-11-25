export default () => (
  {
    title: {
      text: 'title'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Count'
      }
    },
    legend: {
      enabled: true
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
              y1: 0,
                x2: 0,
                  y2: 1
          },
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
          states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
  });
