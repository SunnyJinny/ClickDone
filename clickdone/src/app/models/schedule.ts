export const data = {
  datasets: [{
    label: 'Praktika',
    data: [
      {x: [new Date('2023-04-19'), new Date('2023-04-24')], y: 'Tom Jones', name: 'Tom Jones', status: 2},
      {x: [new Date('2023-04-19'), new Date('2023-04-24')], y: 'Heidrum Kapscher', name: 'Heidrum Kapscher', status: 2}, // completed
      {x: [new Date('2023-04-18'), new Date('2023-04-28')], y: 'Robert Klam', name: 'Robert Klam', status: 2},  // completed
      {x: [new Date('2023-04-18'), new Date('2023-04-28')], y: 'Hubert Klammer', name: 'Hubert Klammer', status: 2},  // completed
      {x: [new Date('2023-04-19'), new Date('2023-04-27')], y: 'Lala li', name: 'Lala li', status: 2},  // completed
      {x: [new Date('2023-06-05'), new Date('2023-06-09')], y: 'Max Miller', name: 'Max Miller', status: 0}, // delayed
      {x: [new Date('2023-06-05'), new Date('2023-06-09')], y: 'Iron Neuer', name: 'Iron Neuer', status: 0}, // delayed
      {x: [new Date('2023-06-06'), new Date('2023-06-16')], y: 'Tommy Stein', name: 'Tommy Stein', status: 1}, // pending
      {x: [new Date('2023-06-06'), new Date('2023-06-16')], y: 'Bella Suder', name: 'Bella Suder', status: 1} // pending
    ],
    backgroundColor: [
      'rgba(28, 192, 154, 1)', 
      'rgba(28, 192, 154, 1)',
      'rgba(28, 192, 154, 1)',
      'rgba(28, 192, 154, 1)',
      'rgba(28, 192, 154, 1)',
      'rgba(196, 239, 229, 1)',
      'rgba(196, 239, 229, 1)',
      'rgba(196, 239, 229, 1)',
      'rgba(196, 239, 229, 1)'
    ],
    // borderColor: [
    //   'rgba(255, 26, 104, 1)',
    //   'rgba(54, 162, 235, 1)',
    //   'rgba(255, 206, 86, 1)',
    //   'rgba(75, 192, 192, 1)',
    //   'rgba(153, 102, 255, 1)',
    //   'rgba(255, 159, 64, 1)',
    //   'rgba(0, 0, 0, 1)'
    // ],
    // borderWidth: 1,     // 막대 border 
    barPercentage: 0.7,    // 막대 두께 (%)
    borderRadius: Number.MAX_VALUE,  // 막대 둥금
    borderSkipped: false,
  }]
};
