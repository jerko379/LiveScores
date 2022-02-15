import { Component, OnInit } from '@angular/core';
import {league} from "../../model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-country-leagues',
  templateUrl: './country-leagues.component.html',
  styleUrls: ['./country-leagues.component.css']
})
export class CountryLeaguesComponent implements OnInit {

  leagues:league[] = [];
  cc : string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.cc=this.route.snapshot.params['code'];
    this.getLeagues();


  }

  getLeagues() {
    fetch("https://api-football-v1.p.rapidapi.com/v3/leagues?code="+this.cc, {
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
        const rLeagues = JSON.parse(result);
        rLeagues["response"].forEach( (e) => {
          this.leagues.push({ idLeague:e['league']['id'], codeCountry:this.cc, countryFlag: e['country']['flag'],
            countryName: e['country']['name'], logo : e['league']['logo'], name:e['league']['name'] });

        })
        console.log(this.leagues)

      })
      .catch(err => {
        console.error(err);
      });
  }

}
