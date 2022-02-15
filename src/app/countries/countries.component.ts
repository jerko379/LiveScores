import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {country} from "../model";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries :  country[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    this.http.get('http://localhost:8081/api/countries')
      .subscribe(res => {
        console.log(res['countries'][0]);
        this.countries=res['countries'][0];
      })



  }

}
