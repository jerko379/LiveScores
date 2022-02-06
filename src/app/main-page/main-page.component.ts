import { Component, OnInit } from '@angular/core';
import {log} from "util";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  uzivoUtakmice;

  constructor() { }

  ngOnInit(): void {
    this.dohvatiUtakmice();
  }

  dohvatiUtakmice(){

    fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all", {
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
              reader.read().then( ({done, value}) => {
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
        return new Response(stream,  {headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        // Do things with result
        const utakmice = JSON.parse(result);
        console.log(utakmice)
        this.uzivoUtakmice=utakmice["response"];
      });




  }

}
