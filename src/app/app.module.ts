import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartComponent } from './total_chart/chart.component';
import { DailyChartComponent } from './daily-chart/daily-chart.component';
import { SelectCountryComponent } from './select-country/select-country.component';
import { ApiService } from './shared/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DailyChartComponent,
    SelectCountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    NgxDatatableModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
