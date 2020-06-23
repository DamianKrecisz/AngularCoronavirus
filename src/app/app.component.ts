import { Component, EventEmitter } from '@angular/core';
import { ApiService } from './shared/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  TotalConfirmed; TotalDeaths; TotalRecovered; Totalresult;
  summary;


  data: Array<any>;
  rows: Array<any>;
  dataNews: Array<any>;
  rowsNews: Array<any>;
  dataDeaths = [];
  dataConfirmed = [];
  dataRecovered = [];
  news = [];
  showDeaths: boolean = true;
  showConfirmed: boolean;
  showRecovered: boolean;
  dailyChart: boolean = true;
  totalChart: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit() {

    
    var rightNow = new Date();
    var res = rightNow.toISOString().slice(0,10).replace(/-/g,"-");
    console.log(res)




    this.api.getTotalStats().subscribe(data => {
      this.Totalresult = data;
      this.saveTotalData();
    });

    this.api.getAllCountryStats().subscribe(data => {
      this.data = [data];
      this.rows = this.data[0].countryitems[0];
      for (let i = 1; i < Object.keys(this.rows).length; i++) {
        this.dataDeaths[this.dataDeaths.length] = this.rows[i];
        this.dataConfirmed[this.dataConfirmed.length] = this.rows[i];
        this.dataRecovered[this.dataRecovered.length] = this.rows[i];

      };
      this.dataDeaths.sort(function (a, b) {
        return b.total_deaths - a.total_deaths;
      });
      this.dataConfirmed.sort(function (a, b) {
        return b.total_cases - a.total_cases;
      });
      this.dataRecovered.sort(function (a, b) {
        return b.total_recovered - a.total_recovered;
      });
    });

    this.api.getNews().subscribe(data => {
      this.dataNews = [data];
      this.rowsNews = this.dataNews[0].articles;
      for (let i = 1; i < Object.keys(this.rowsNews).length; i++) {
        this.news[this.news.length] = this.rowsNews[i];
      };
    });

  }

  saveTotalData() {
    this.TotalConfirmed = this.Totalresult.results[0].total_cases;
    this.TotalDeaths = this.Totalresult.results[0].total_deaths;
    this.TotalRecovered = this.Totalresult.results[0].total_recovered;
  }
  showDeathsStats() {
    this.showDeaths = true;
    this.showConfirmed = false;
    this.showRecovered = false;
  }
  showConfirmedStats() {
    this.showDeaths = false;
    this.showConfirmed = true;
    this.showRecovered = false;

  }
  showRecoveredStats() {
    this.showRecovered = false;
    this.showConfirmed = false;
    this.showRecovered = true;
  }

  showDailyChart() {
    this.dailyChart = true;
    this.totalChart = false
  }
  showTotalChart() {
    this.dailyChart = false;
    this.totalChart = true
  }
}
