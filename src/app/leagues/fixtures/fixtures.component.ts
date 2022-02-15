import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {fixture, league} from "../../model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})



export class FixturesComponent implements OnInit {
  fixtures:fixture[] = [];
  id:Number;

  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    console.log(this.id)
    this.http.get('http://localhost:8081/api/fixtures/'+this.id)
      .subscribe(res => {
        console.log(res['fixtures'][0])
        res['fixtures'][0].forEach( (e,i) => {
          e["dateTime"]=new Date(e["dateTime"])
        this.fixtures.push(e);



  });


  });

  }

  delete(idDelete:number) {
    let dFixture=this.fixtures[idDelete];
    this.http.delete('http://localhost:8081/api/fixtures/' + dFixture["idFixture"])
      .subscribe(res => {
        console.log(res);
        this.fixtures.splice(idDelete,1);
      })
  }

  invalidate(fixture) {

    this.http.put('http://localhost:8081/api/fixtures/'  , fixture  )
      .subscribe(res => {
        fixture['shortStatus']='SUSP';
        fixture['longStatus']='Match Invalidated';
        console.log(res);
      })
  }

}
