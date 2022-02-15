import { Component, OnInit } from '@angular/core';
import {fixture, league} from "../../../model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-country-fixtures',
  templateUrl: './country-fixtures.component.html',
  styleUrls: ['./country-fixtures.component.css']
})
export class CountryFixturesComponent implements OnInit {

  fixtures:fixture[] = [];
  id : number;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.getFixtures();


  }

  getFixtures() {
    fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?league="+ this.id +"&season=2021", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "3109d60b8emshf03f1cc48010687p195cf6jsnd964518459b4"
      }
    })
      .then(response => {
        const reader = response.body.getReader();
        console.log(reader)
        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({done, value}) => {
                // If there is no more data to read
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                console.log(done, value);
                push();
              })
            }

            push();
          }
        });
      })
      .then(stream => {
        // Respond with our stream
        console.log(stream);
        return new Response(stream, {headers: {"Content-Type": "text/html"}}).text();
      })
      .then(result => {
        // Do things with result
        const rMatches = JSON.parse(result);
        console.log("rmatches" + rMatches)
        rMatches["response"].forEach( (e) => {
          this.fixtures.push({idFixture : e["fixture"]["id"], dateTime : new Date(e["fixture"]["date"]), shortStatus : e["fixture"]["status"]["short"],
            longStatus :  e["fixture"]["status"]["long"] , elapsed : e["fixture"]["status"]["elapsed"] , leagueid : e["league"]["id"],
            nameHome: e["teams"]["home"]["name"] , nameAway : e["teams"]["away"]["name"], goalsHome : e["goals"]["home"], goalsAway : e["goals"]["away"] });

        })
        console.log(this.fixtures)
      })
      .catch(err => {
        console.error(err);
      });
  }

}
