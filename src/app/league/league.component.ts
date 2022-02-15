import {Component, OnInit} from '@angular/core';

import {league} from "../model";
import {HttpClient} from "@angular/common/http";

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

    this.http.get('http://localhost:8081/api/leagues')
      .subscribe(res => {
        console.log(res['leagues'][0]);
        this.leagues=res['leagues'][0];
      })



  }


}
