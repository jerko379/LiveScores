import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AlertModule} from "ngx-bootstrap/alert";
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import {AppRoutingModule} from "./routing";
import { NavComponent } from './shared/nav/nav.component';
import { LiveComponent } from './live/live.component';
import { LeagueComponent } from './league/league.component';
import { FixtureComponent } from './fixture/fixture.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./auth/auth.module";
import {AuthRoutingModule} from "./auth/auth-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavComponent,
    LiveComponent,
    LeagueComponent,
    FixtureComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule,
    HttpClientModule,
    AuthModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
