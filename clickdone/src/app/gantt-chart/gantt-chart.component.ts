import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit  {
  
  public barChartData: ChartData<'bar', {x: string[], y: string, name: string}[]> = {
    datasets: [{
      data: [
        {x: ['2023-04-25', '2023-04-29'], y: 'task 1', name: 'Tom Jones'}, 
        {x: ['2023-04-25', '2023-04-29'], y: 'task 2', name: 'Heidrum Kapscher'},
        {x: ['2023-04-24', '2023-04-30'], y: 'task 3', name: 'Robert Klam'},  // completed
        {x: ['2023-04-24', '2023-04-30'], y: 'task 4', name: 'Hubert Klammer'},  // completed
        {x: ['2023-04-25', '2023-04-29'], y: 'task 5', name: 'Lala li'},  // completed
        {x: ['2023-06-05', '2023-06-09'], y: 'task 1', name: 'Max Miller'}, // delayed
        {x: ['2023-06-05', '2023-06-09'], y: 'task 2', name: 'Iron Neuer'}, // delayed
        {x: ['2023-06-06', '2023-06-16'], y: 'task 3', name: 'Tommy Stein'}, // pending
        {x: ['2023-06-06', '2023-06-16'], y: 'task 4', name: 'Bella Suder'} // pending

        // {x: [new Date('2023-04-19'), new Date('2023-04-24')], y: 'Tom Jones'}, 
        // {x: [new Date('2023-04-19'), new Date('2023-04-24')], y: 'Heidrum Kapscher'},
        // {x: [new Date('2023-04-18'), new Date('2023-04-28')], y: 'Robert Klam'},  // completed
        // {x: [new Date('2023-04-18'), new Date('2023-04-28')], y: 'Hubert Klammer'},  // completed
        // {x: [new Date('2023-04-19'), new Date('2023-04-27')], y: 'Lala li'},  // completed
        // {x: [new Date('2023-06-05'), new Date('2023-06-09')], y: 'Max Miller'}, // delayed
        // {x: [new Date('2023-06-05'), new Date('2023-06-09')], y: 'Iron Neuer'}, // delayed
        // {x: [new Date('2023-06-06'), new Date('2023-06-16')], y: 'Tommy Stein'}, // pending
        // {x: [new Date('2023-06-06'), new Date('2023-06-16')], y: 'Bella Suder'} // pending
  
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
        'rgba(196, 239, 229, 1)',
      ],
      barPercentage: 0.8,    // 막대 두께 (%)
      borderRadius: Number.MAX_VALUE,  // 막대 둥금
      borderSkipped: false,
    }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    animation: false,  // 애니메이션 생략
    indexAxis: 'y',
    scales: {
      x: {
        position: 'top',
        min: new Date().valueOf(),  // 시작점을 오늘
        max: new Date('2023-04-31').valueOf(), // 오늘로 부터 2주를 보고 싶다. 
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'dd MMM',
          },
        }
      },
      y: {
        display: false, 
      }
    },
    plugins: {
      datalabels: {
        display: false, // show inner bar Text
      },
      tooltip: {
        enabled: false // bar hover -> show text
      },
      legend: {
        display: false,
      }
    }
  };
  
  public barChartLegend = false;
  public barChartPlugins = [
    DataLabelsPlugin
  ];
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  constructor() {
    
  }
  
  ngOnInit(): void {
    // this.RenderChart();
  }
    
  public chartClicked({ event, active }: { event?: ChartEvent | undefined, active?: {}[] | undefined }): void {
    // console.log(event, active);
    console.log(this.chart?.options?.scales?.['x']?.max);
  }
  
  public chartHovered(e: any): void {
  //   console.log(e);
  }

  //@HostListener('click')
  public chartFilter(date: any) {
    // console.log(this.chart?.datasets);
    
    console.log(date.srcElement.value);
    const year = date.srcElement.value.substring(0, 4);
    const month = date.srcElement.value.substring(5, 7);
    console.log(year, month);
    const lastDay = (y: any, m: any) => {
      return new Date(y, m, 0).getDate();
    }
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-${lastDay(year, month)}`;
    console.log(startDate, endDate);
    
    // const startDate = new Date();
    // const endDate = new Date(startDate.setDate(startDate.getDate() + 21));;
    
    // this.chart?.options?.scales?.['x']?.max = endDate;
    // this.barChartOptions.scales.x.min = startDate;
    // this.myChart.config.options.scales.x.max = endDate;
    // myChart.update();
  }
}
