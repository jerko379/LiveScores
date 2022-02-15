import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {fixture} from "../model";

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {
  datum:string;
  fixture;
  id:number;


  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.getFixtureEvents();

  }

  getFixtureEvents() {
    fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?id="+this.id, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "3109d60b8emshf03f1cc48010687p195cf6jsnd964518459b4"
      }
    }).then(response => {
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
        const thisFixture = JSON.parse(result);
        //console.log("fixture: ");
        this.fixture = thisFixture["response"][0];
        this.datum=new Date(this.fixture["fixture"]["date"]).toLocaleString();

      });
  }





}
