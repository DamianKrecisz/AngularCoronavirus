
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ApiService } from '../shared/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Total Confirmed' },
    { data: [], label: 'Total Deaths', yAxisID: 'y-axis-1' },
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
            labelString: 'Total Confirmed',
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
            labelString: 'Total Deaths',
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
  dates = [];
  dataArray: Array<any>;
  singleDays: Array<any>;
  datesOfChart = [];
  total_cases = [];
  total_deaths = [];
  total_recovered = [];

  country: any;
  subscription: Subscription;

  tDeaths; tConfirmed; tRecovered;
  tTest;

  constructor(private api: ApiService) {
    this.api.getMessage().subscribe(country => {
      this.country = country;
      this.generateTotalChart(this.country.text);
    });
  }

  ngOnInit() {
    this.country = this.api.getValue();
    this.generateTotalChart(this.country);
  }

  generateTotalChart(country) {
    
    this.api.getCountryStatistics(country).subscribe(data => {
      this.tTest = [data]
      console.log(this.tTest[0].countrydata[0])
      this.tDeaths = this.tTest[0].countrydata[0].total_deaths;
      this.tConfirmed = this.tTest[0].countrydata[0].total_cases;

    })

    this.api.getCountryTimeline(country).subscribe(data => {

      this.resetDataChart();
      this.dataArray = [data];
      this.singleDays = this.dataArray[0].timelineitems[0];

      Object.keys(this.singleDays).forEach(element => {
        this.datesOfChart.push(element)
      });
      this.datesOfChart.pop();

      Object.values(this.singleDays).forEach(element => {
        this.total_cases.push(element.total_cases)
      });
      Object.values(this.singleDays).forEach(element => {
        this.total_deaths.push(element.total_deaths)
      });

      this.lineChartData[0].data = this.total_cases;
      this.lineChartData[1].data = this.total_deaths;
      this.lineChartLabels = this.datesOfChart;
    });
  }

  resetDataChart() {
    this.lineChartData[0].data = [];
    this.lineChartData[1].data = [];
    this.datesOfChart = [];
    this.total_cases = [];
    this.total_deaths = [];
    this.lineChartLabels = [];
  }
}
