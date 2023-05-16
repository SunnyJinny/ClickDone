import { StudentService } from "../services/student.service";


export const data1 = [
  { x: [ Date.parse('2023-05-08 00:00:00'), Date.parse('2023-05-15 00:00:00')], y: 'Tom Jones'}, 
  { x: [ Date.parse('2023-05-08 00:00:00'), Date.parse('2023-05-15 00:00:00')], y: 'Heidrum Kapscher'},
  { x: [ Date.parse('2023-05-09 00:00:00'), Date.parse('2023-05-13 00:00:00')], y: 'Robert Klam'},  // completed
  { x: [ Date.parse('2023-05-09 00:00:00'), Date.parse('2023-05-14 00:00:00')], y: 'Hubert Klammer'},  // completed
  { x: [ Date.parse('2023-05-08 00:00:00'), Date.parse('2023-05-15 00:00:00')], y: 'Lala li'},  // completed
  { x: [ Date.parse('2023-06-01 00:00:00'), Date.parse('2023-06-09 00:00:00')], y: 'Max Miller'}, // delayed
  { x: [ Date.parse('2023-06-02 00:00:00'), Date.parse('2023-06-09 00:00:00')], y: 'Iron Neuer'}, // delayed
  { x: [ Date.parse('2023-06-02 00:00:00'), Date.parse('2023-06-16 00:00:00')], y: 'Tommy Stein'}, // pending
  { x: [ Date.parse('2023-06-01 00:00:00'), Date.parse('2023-06-16 00:00:00')], y: 'Bella Suder'}, // pending
]

export const data2 = [
  { x: [new Date('2023-05-15 00:00:00'), new Date('2023-05-26 00:00:00')], y: 'Tom Jones'}, 
  { x: [new Date('2023-05-15 00:00:00'), new Date('2023-05-26 00:00:00')], y: 'Heidrum Kapscher'},
  { x: [new Date('2023-05-15 00:00:00'), new Date('2023-05-26 00:00:00')], y: 'Robert Klam'},  // completed
  { x: [new Date('2023-05-15 00:00:00'), new Date('2023-05-26 00:00:00')], y: 'Hubert Klammer'},  // completed
  { x: [new Date('2023-05-15 00:00:00'), new Date('2023-05-26 00:00:00')], y: 'Lala li'},  // completed
  { x: [new Date('2023-05-15 00:00:00'), new Date('2023-05-26 00:00:00')], y: 'Max Miller'}, // delayed
  { x: [new Date('2023-05-15 00:00:00'), new Date('2023-05-26 00:00:00')], y: 'Iron Neuer'}, // delayed
  { x: [new Date('2023-05-15 00:00:00'), new Date('2023-05-26 00:00:00')], y: 'Tommy Stein'}, // pending
  { x: [new Date('2023-05-15 00:00:00'), new Date('2023-05-26 00:00:00')], y: 'Bella Suder'} // pending
]

export const date3 = [
  {x: ['2023-04-25', '2023-04-29'], y: 'task 1', name: 'Tom Jones'}, 
  {x: ['2023-04-25', '2023-04-29'], y: 'task 2', name: 'Heidrum Kapscher'},
  {x: ['2023-04-24', '2023-04-30'], y: 'task 3', name: 'Robert Klam'},  // completed
  {x: ['2023-04-24', '2023-04-30'], y: 'task 4', name: 'Hubert Klammer'},  // completed
  {x: ['2023-04-25', '2023-04-29'], y: 'task 5', name: 'Lala li'},  // completed
  {x: ['2023-06-05', '2023-06-09'], y: 'task 1', name: 'Max Miller'}, // delayed
  {x: ['2023-06-05', '2023-06-09'], y: 'task 2', name: 'Iron Neuer'}, // delayed
  {x: ['2023-06-06', '2023-06-16'], y: 'task 3', name: 'Tommy Stein'}, // pending
  {x: ['2023-06-06', '2023-06-16'], y: 'task 4', name: 'Bella Suder'} // pending
]
