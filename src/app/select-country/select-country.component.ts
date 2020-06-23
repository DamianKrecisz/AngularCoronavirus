import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit {
  data: Array<any>;
  rows: Array<any>;
  countries = [];
  country: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.sendMessage(this.country);

    this.api.getAllCountryStats().subscribe(data => {
      this.data = [data];
      this.rows = this.data[0].countryitems[0];
      for (let i = 1; i < Object.keys(this.rows).length; i++) {
        this.countries[this.countries.length] = this.rows[i];
      };
    });
  }

  showEvent(e) {
    
    this.api.sendMessage(e);
    this.changeGV(e);
  }
  changeGV(e){
    this.api.setValue(e);
  }
}
