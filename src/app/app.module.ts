import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AlertModule} from "ngx-bootstrap/alert";
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import {AppRoutingModule} from "./routing";
import { NavComponent } from './shared/nav/nav.component';
import { LiveComponent } from './live/live.component';
import { LeagueComponent } from './leagues/league.component';
import { FixtureComponent } from './fixture/fixture.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./auth/auth.module";
import {AuthRoutingModule} from "./auth/auth-routing.module";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FixturesComponent } from './leagues/fixtures/fixtures.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CountriesComponent } from './countries/countries.component';
import { CountryLeaguesComponent } from './countries/country-leagues/country-leagues.component';
import {CountryFixturesComponent} from "./countries/country-leagues/country-fixtures/country-fixtures.component";
import { SortingPipe } from './shared/sorting.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavComponent,
    LiveComponent,
    LeagueComponent,
    FixtureComponent,
    FixturesComponent,
    CountriesComponent,
    CountryLeaguesComponent,
    CountryFixturesComponent,
    SortingPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NoopAnimationsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
