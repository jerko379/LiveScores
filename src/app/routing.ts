import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {LiveComponent} from "./live/live.component";
import {LeagueComponent} from "./leagues/league.component";
import {FixtureComponent} from "./fixture/fixture.component";
import {AuthModule} from "./auth/auth.module";
import {FixturesComponent} from "./leagues/fixtures/fixtures.component";
import {CountriesComponent} from "./countries/countries.component";
import {CountryLeaguesComponent} from "./countries/country-leagues/country-leagues.component";
import {CountryFixturesComponent} from "./countries/country-leagues/country-fixtures/country-fixtures.component";


const routes : Route[] = [
  {path:'',component:MainPageComponent},
  {path:'live', component:LiveComponent},
  {path:'leagues', component:LeagueComponent},
  {path:'fixture/:id' , component:FixtureComponent},
  {path:'leagues/fixtures/:id' , component:FixturesComponent},
  {path:'countries/leagues/:id' , component:CountryFixturesComponent},
  {path:'countries' , component:CountriesComponent},
  {path:'countries/:code' , component:CountryLeaguesComponent},
  {path:'auth', loadChildren: () => AuthModule}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
