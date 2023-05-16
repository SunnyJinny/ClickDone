import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Context } from 'chartjs-plugin-datalabels';
import 'chartjs-adapter-date-fns';
import { data1, data2 } from 'src/app/models/schedule';
import { Route, Router } from '@angular/router';
import { Student, StudentChart } from 'src/app/models/schueler-liste';
import { StudentService } from 'src/app/services/student.service';
import { firstValueFrom, map } from 'rxjs';
import { TransitionCheckState } from '@angular/material/checkbox';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})

export class GanttChartComponent implements OnInit  {
  
  originData!: StudentChart[];
  filteredByWeek: StudentChart[] = [];
  filteredByMonth: StudentChart[] = [];
  filteredByYear: StudentChart[] = [];
  
  //data = data2;
  chart: any = [];
  
  // todayLine plugin block
  TodayLine = {
    id: 'TodayLine',
    afterDatasetsDraw(chart: any) {
      const { ctx, data, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
      ctx.save();
      // line for today
      ctx.beginPath();
      ctx.lineWidth = 1;
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
  
  public barChartData: ChartData<'bar', {x: Date[], y: string}[]> = {
    datasets: [{
      // TODO: data 변경
      data: this.filteredByWeek,
      backgroundColor: [
        'rgba(28, 192, 154, 1)',
        // 'rgba(196, 239, 229, 1)',
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
    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
    plugins: {
      datalabels: {
        display: true, // show inner bar Text
        clamp: true,
        anchor: 'start',
        align: 'end',
        offset: 20,
        color: '#1b1c1d',
        font: {
          family: "'Poppins', sans-serif",
          size: 18,
          //weight: 'bold',
        },
        formatter: function(value, ctx: Context) {
          if (typeof ctx.dataset.data[ctx.dataIndex] === 'object') {
            const data = ctx.dataset.data[ctx.dataIndex];
            if (!data || typeof data === 'number' || Array.isArray(data)) {
              return null;
            } else if ('y' in data) {
              return data.y;
            } else {
              return null;
            }
          } else {
            return null;
          }
        },
        
      },
      tooltip: {
        enabled: true, // bar hover -> show text
        displayColors: true,
        backgroundColor: '#fff',
        titleColor: '#FABE2A',
        titleFont: {
          family: "'Poppins', sans-serif",
          weight: 'normal',
          lineHeight: 1.3
        },
        titleMarginBottom: 0,
        xAlign: 'center',
        // yAlign: 'top',    // 추가 인포가 bar 오른쪽 위로 고정한다. 
        footerMarginTop: 0,
        borderColor: '#1CC09A',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => {
            return '';
          },
          title: (ctx) => {
            const startDate = new Date((ctx[0] as any).raw.x[0]);
            const endDate = new Date((ctx[0] as any).raw.x[1]);
            const formattedStartDate = startDate.toLocaleString("de-DE", {
              // year: 'numeric',
              month: 'short',
              day: 'numeric',
              // hour12: true
            });
            const formattedEndDate = endDate.toLocaleString("de-DE", {
              // year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
            // return [`Praktikum Zeitraum: ${formattedStartDate} - ${formattedEndDate}`];
            return [(ctx[0] as any).raw.y , `Praktikum Zeitraum: ${formattedStartDate} - ${formattedEndDate}`];
          }
        }
      },
      legend: {
        display: false,
      }
    },
  };
  
  public barChartLegend = false;
  public barChartPlugins = [
    DataLabelsPlugin,
    this.TodayLine,
  ];
  
  constructor( 
    private router: Router, 
    private _studentService: StudentService ) { 
    Chart.register(...registerables);
  }

  async getChangeData() {
    const res = await firstValueFrom(this._studentService.getStudentAll());
    this.originData = [];
    res.map((student:Student) => {
        this.originData.push({'x': [new Date(student.startDatum), new Date(student.endDatum)], 'y': student.name });
      })
    this.filteredByWeek = await this.filterByDate(this.originData, this.today, this.afterOneWeek);
    this.filteredByMonth = await this.filterByDate(this.originData, this.today, this.afterOneMonth);
    this.filteredByYear = await this.filterByDate(this.originData, this.today, this.afterOneYear);
    if (this.chart && this.chart.config && this.chart.config.data && this.chart.config.data.dataset) {
      const dataset = this.chart.config.data.dataset;
      if (dataset.length > 0) {
        dataset[0].data = this.filteredByWeek;
      }
    }
  }
  
  async filterByDate(originData: StudentChart[], startDatum: Date, endDatum: Date) {   
    return originData.filter(obj => {
      const objStartDatum = obj.x[0];
      const objEndDatum = obj.x[1];
      return (objStartDatum >= startDatum && objStartDatum <= endDatum ) || (objEndDatum <= endDatum && objEndDatum >= startDatum);
    });
  }
  
  async drawChart(): Promise<void> { 
    
    this.barChartData.datasets[0].data = this.filteredByWeek;
    
    this.chart = new Chart('schedule', {
      type: 'bar',
      data: this.barChartData,
      options: this.barChartOptions,
      plugins: this.barChartPlugins,
    })
  }  

async ngOnInit(): Promise<void> {
    await this.getChangeData();
    await this.drawChart();
  }
  
  public timeFrame(period: string): void {
    if(period === 'week') {
      if (this.barChartOptions?.scales?.['x'] !== undefined) {
        this.barChartOptions.scales['x'].max = this.maxWeek;
        if (this.barChartOptions?.plugins?.datalabels?.display == false ) {
          this.barChartOptions.plugins.datalabels.display = true;
        }
      }
      if (this.chart && this.chart.config && this.chart.config.data && this.chart.config.data.datasets && this.chart.config.data.datasets.length > 0) {
        this.chart.config.data.datasets[0].data = this.filteredByWeek;
        this.chart.update();
      }
    } else if(period === 'month') {
      if (this.barChartOptions?.scales?.['x'] !== undefined) {
        this.barChartOptions.scales['x'].max = this.maxMonth;
        if (this.barChartOptions?.plugins?.datalabels?.display == false ) {
          this.barChartOptions.plugins.datalabels.display = true;
        }  
      }
      if (this.barChartData.datasets && this.barChartData.datasets.length > 0) {
        this.barChartData.datasets[0].data = this.filteredByMonth;
        this.chart.update();
      }
    } else if(period === 'year') {
      if (this.barChartOptions?.scales?.['x'] !== undefined) {
        this.barChartOptions.scales['x'].max = this.maxYear;
        if (this.barChartOptions?.plugins?.datalabels?.display ) {
          this.barChartOptions.plugins.datalabels.display = false;
        }  
      }
      this.barChartData.datasets[0].data = this.filteredByYear;
      this.chart.update();
      
    }
  }
  public clickHandler(click: MouseEvent): void {
    const points = this.chart.getElementsAtEventForMode(click, 'nearest', { intersect: true }, true);
    if(points.length) {
      const firstPoint = points[0];
      const value = this.chart.data.datasets[0].data[firstPoint.index];
      this.router.navigate(['/students']);
    }
  }

  public chartFilter(date: any) {
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
