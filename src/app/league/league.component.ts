import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {fixture, league} from "../main-page/model";

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  leagues:league[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getLeagues();



  }

  getLeagues() {

    this.http.get('/api/users')
      .subscribe(res => {
        console.log(res);
      })


  }

}
