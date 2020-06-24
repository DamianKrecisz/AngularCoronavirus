import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private myValue;

  setValue(val) {
    this.myValue = val;
  }

  getValue() {
    return this.myValue;
  }

  country: string;
  baseUrl = 'https://api.thevirustracker.com/';

  private subject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  header = {
    headers: new HttpHeaders()
      .set("Authorization", "sBBqsGXiYgF0Db5OV5tAw-SjUjEMF7y1YwvnLKcLl_PZ61kwIF7KXWeVoAvy-CgEn2pHZrSf1gT2PUujH1YaQA")
  }

  dataApi() {
    return this.http.get("https://api.newsriver.io/v2/search?query=title%3Acoronavirus%20OR%20text%3Acoronavirus&sortBy=discoverDate&sortOrder=DESC&limit=15", this.header);

  }
  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getTotalStats() {
    return this.http.get(this.baseUrl + '/free-api?global=stats');
  }
  getAllCountryStats() {
    return this.http.get(this.baseUrl + '/free-api?countryTotals=ALL');
  }
  getNews() {
    var rightNow = new Date();
    var res = rightNow.toISOString().slice(0, 10).replace(/-/g, "-");
    return this.http.get("https://newsapi.org/v2/everything?q=coronavirus&from=" + res + "&sortBy=publishedAt&apiKey=0477f360c5c7421e995f0f382401bc21")
  }
  getCountryTimeline(myValue) {
    return this.http.get(this.baseUrl + "/free-api?countryTimeline=" + myValue);
  }
  getCountryStatistics(myValue) {
    return this.http.get(this.baseUrl + "free-api?countryTotal=" + myValue)
  }
  myData(country) {
    console.log(country);
    return this.http.get(this.baseUrl + "/free-api?countryTimeline=" + country);
  }


}
