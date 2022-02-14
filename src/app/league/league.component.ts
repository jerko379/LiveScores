import { Component, OnInit } from '@angular/core';

import {fixture, league} from "../model";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  leagues:league[] = [
  ];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    this.http.get('http://localhost:8081/leagues')
      .subscribe(res => {
        const lige= JSON.parse(JSON.stringify(res))
        this.leagues=lige;
        console.log(this.leagues);
      })



  }


}
