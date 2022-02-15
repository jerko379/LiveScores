import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {country} from "../model";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries :  country[] = [];

  constructor(private http:HttpClient, private dataService: DataService) { }

  ngOnInit(): void {


      this.dataService.getCountries().subscribe(res => {
        console.log(res['countries'][0]);
        this.countries=res['countries'][0];
      })



  }

  delete(idDelete:number) {
    let dFixture=this.countries[idDelete];
    this.dataService.deleteCountry(dFixture["code"])
      .subscribe(res => {
        console.log(res['status']);
        if ( res['status'] == 'OK' ) {
          this.countries.splice(idDelete,1);
        }

      })
  }

}
