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
  
  public chart: any = [];
  // todayLine plugin block
  TodayLine = {
    id: 'TodayLine',
    afterDatasetsDraw(chart: any) {
      const { ctx, data, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
      ctx.save();
      // line for today
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#F15D23';
      // ctx.setLineDash([6, 6]);  // 색 6px, 투명 6px
      ctx.moveTo(x.getPixelForValue(new Date(new Date().setHours(0,0,0,0))), top);
      ctx.lineTo(x.getPixelForValue(new Date(new Date().setHours(0,0,0,0))), bottom);
      ctx.stroke();
      ctx.restore();
      // arrow for today
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#F15D23';
      ctx.fillStyle = '#F15D23';        
      ctx.moveTo(x.getPixelForValue(new Date(new Date().setHours(0,0,0,0))), top + 3);
      ctx.lineTo(x.getPixelForValue(new Date(new Date().setHours(0,0,0,0))) - 6, top - 6);
      ctx.lineTo(x.getPixelForValue(new Date(new Date().setHours(0,0,0,0))) + 6, top - 6);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.restore();
      // text backgound white
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.fillRect(x.getPixelForValue(new Date(new Date().setHours(0,0,0,0))) - 20 , top - 30, 40, 20);
      ctx.restore();
      // text for today
      ctx.font = 'bold 14px sans-serif';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText('heute', x.getPixelForValue(new Date(new Date().setHours(0,0,0,0))) , top - 14);
      ctx.restore();
    }
  }
  
  public barChartData: ChartData<'bar', {x: any[], y: string}[]> = {
    datasets: [{
      data: [
        // {x: ['2023-04-25', '2023-04-29'], y: 'task 1', name: 'Tom Jones'}, 
        // {x: ['2023-04-25', '2023-04-29'], y: 'task 2', name: 'Heidrum Kapscher'},
        // {x: ['2023-04-24', '2023-04-30'], y: 'task 3', name: 'Robert Klam'},  // completed
        // {x: ['2023-04-24', '2023-04-30'], y: 'task 4', name: 'Hubert Klammer'},  // completed
        // {x: ['2023-04-25', '2023-04-29'], y: 'task 5', name: 'Lala li'},  // completed
        // {x: ['2023-06-05', '2023-06-09'], y: 'task 1', name: 'Max Miller'}, // delayed
        // {x: ['2023-06-05', '2023-06-09'], y: 'task 2', name: 'Iron Neuer'}, // delayed
        // {x: ['2023-06-06', '2023-06-16'], y: 'task 3', name: 'Tommy Stein'}, // pending
        // {x: ['2023-06-06', '2023-06-16'], y: 'task 4', name: 'Bella Suder'} // pending

        { x: [ Date.parse('2023-05-01 00:00:00'), Date.parse('2023-05-5 00:00:00')], y: 'Tom Jones'}, 
        { x: [ Date.parse('2023-05-01 00:00:00'), Date.parse('2023-05-5 00:00:00')], y: 'Heidrum Kapscher'},
        { x: [ Date.parse('2023-05-02 00:00:00'), Date.parse('2023-05-12 00:00:00')], y: 'Robert Klam'},  // completed
        { x: [ Date.parse('2023-05-02 00:00:00'), Date.parse('2023-05-12 00:00:00')], y: 'Hubert Klammer'},  // completed
        { x: [ Date.parse('2023-05-01 00:00:00'), Date.parse('2023-05-5 00:00:00')], y: 'Lala li'},  // completed
        { x: [ Date.parse('2023-06-05 00:00:00'), Date.parse('2023-06-9 00:00:00')], y: 'Max Miller'}, // delayed
        { x: [ Date.parse('2023-06-05 00:00:00'), Date.parse('2023-06-9 00:00:00')], y: 'Iron Neuer'}, // delayed
        { x: [ Date.parse('2023-06-06 00:00:00'), Date.parse('2023-06-16 00:00:00')], y: 'Tommy Stein'}, // pending
        { x: [ Date.parse('2023-06-06 00:00:00'), Date.parse('2023-06-16 00:00:00')], y: 'Bella Suder'}, // pending
  
        // { x: [new Date(2023, 5, 1), new Date(2023, 5, 5)], y: 'Tom Jones'}, 
        // { x: [new Date(2023, 5, 1), new Date(2023, 5, 5)], y: 'Heidrum Kapscher'},
        // { x: [new Date(2023, 5, 2), new Date(2023, 5, 12)], y: 'Robert Klam'},  // completed
        // { x: [new Date(2023, 5, 2), new Date(2023, 5, 12)], y: 'Hubert Klammer'},  // completed
        // { x: [new Date(2023, 5, 1), new Date(2023, 5, 5)], y: 'Lala li'},  // completed
        // { x: [new Date(2023, 6, 5), new Date(2023, 6, 9)], y: 'Max Miller'}, // delayed
        // { x: [new Date(2023, 6, 5), new Date(2023, 6, 9)], y: 'Iron Neuer'}, // delayed
        // { x: [new Date(2023, 6, 6), new Date(2023, 6, 16)], y: 'Tommy Stein'}, // pending
        // { x: [new Date(2023, 6, 6), new Date(2023, 6, 16)], y: 'Bella Suder'} // pending
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
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
    }],
  };

  today = new Date(new Date().setHours(0,0,0,0));
  afterOneWeek = new Date(new Date(new Date().setHours(0,0,0,0)).setDate(new Date(new Date().setHours(0,0,0,0)).getDate() + 7));
  afterOneMonth = new Date(new Date(new Date().setHours(0,0,0,0)).setMonth(new Date(new Date().setHours(0,0,0,0)).getMonth() + 1));
  afterOneYear = new Date(new Date(new Date().setHours(0,0,0,0)).setFullYear(new Date(new Date().setHours(0,0,0,0)).getFullYear() + 1))
  maxWeek: number = this.afterOneWeek.valueOf();
  maxMonth: number = this.afterOneMonth.valueOf();
  maxYear: number = this.afterOneYear.valueOf();
  
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    animation: false,  // 애니메이션 생략
    indexAxis: 'y',
    scales: {
      x: {
        position: 'top',
        min: new Date(new Date().setHours(0,0,0,0)).valueOf(),
        max: this.maxWeek,
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
    DataLabelsPlugin,
    this.TodayLine,
  ];
  
  // @ViewChild(BaseChartDirective) _chart: BaseChartDirective | undefined;
  
  constructor() { }
  
  ngOnInit(): void {
    
    this.chart = new Chart('schedule', {
      type: 'bar',
      data: this.barChartData,
      options: this.barChartOptions,
      plugins: this.barChartPlugins,
    })
  }
  
  public timeFrame(period: string): void {
    console.log(period);
    if(period === 'week') {
      if (this.barChartOptions?.scales?.['x']?.min !== undefined) {
        this.barChartOptions.scales['x'].max = this.maxWeek;
        console.log(this.afterOneWeek);
        this.chart.update();
      }
    } else if(period === 'month') {
      if (this.barChartOptions?.scales?.['x']?.min !== undefined) {
        this.barChartOptions.scales['x'].max = this.maxMonth;
        console.log(this.afterOneMonth);
        this.chart.update();
      }
    } else if(period === 'year') {
      if (this.barChartOptions?.scales?.['x']?.min !== undefined) {
        this.barChartOptions.scales['x'].max = this.maxYear;
        console.log(this.afterOneYear);
        this.chart.update();
      }
    }
  }
  public chartClicked({ event, active }: { event?: ChartEvent | undefined, active?: {}[] | undefined }): void {
    // console.log(event, active);
    console.log(this.chart?.options?.scales?.['x']?.max);
  }
  
  public chartHovered(e: any): void {
  //   console.log(e);
  }

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
