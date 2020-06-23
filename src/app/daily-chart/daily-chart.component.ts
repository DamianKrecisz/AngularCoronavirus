
import { Component, OnInit, } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ApiService } from '../shared/api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss']
})
export class DailyChartComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'New Daily Cases' },
    { data: [], label: 'New Daily Death', yAxisID: 'y-axis-1' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'New Daily Cases',
            fontColor: 'grey',
            fontSize: 18
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',

          },
          scaleLabel: {
            display: true,
            labelString: 'New Daily Death',
            fontColor: 'red',
            fontSize: 18
          }
        }
      ]
    }
  };

  lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  lineChartType = 'line';

  dataArray: Array<any>;
  singleDays: Array<any>;
  dates = [];
  datesOfChart = [];
  new_daily_cases = [];
  new_daily_deaths = [];
  country: any;

  constructor(private api: ApiService) {
    this.api.getMessage().subscribe(country => {
      this.country = country;
      this.generateDailyChart(this.country.text);
    });
  }

  ngOnInit() {
    this.country = this.api.getValue();
    this.generateDailyChart(this.country);
  }

  generateDailyChart(country) {

    this.api.getCountryTimeline(country).subscribe(data => {
      
      this.resetDataChart();
      this.dataArray = [data];
      this.singleDays = this.dataArray[0].timelineitems[0];

      Object.keys(this.singleDays).forEach(element => {
        this.datesOfChart.push(element)
      });
      this.datesOfChart.pop();

      Object.values(this.singleDays).forEach(element => {
        this.new_daily_cases.push(element.new_daily_cases)
      });

      Object.values(this.singleDays).forEach(element => {
        this.new_daily_deaths.push(element.new_daily_deaths)
      });

      this.lineChartData[0].data = this.new_daily_cases;
      this.lineChartData[1].data = this.new_daily_deaths;
      this.lineChartLabels = this.datesOfChart;
    })
  }

  resetDataChart() {
    this.lineChartData[0].data = [];
    this.lineChartData[1].data = [];
    this.datesOfChart = [];
    this.new_daily_cases = [];
    this.new_daily_deaths = [];
    this.lineChartLabels = [];
  }
}
