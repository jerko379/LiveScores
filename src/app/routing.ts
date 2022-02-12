import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {LiveComponent} from "./live/live.component";
import {LeagueComponent} from "./league/league.component";
import {FixtureComponent} from "./fixture/fixture.component";


const routes : Route[] = [
  {path:'',component:MainPageComponent},
  {path:'live', component:LiveComponent},
  {path:'league', component:LeagueComponent},
  {path:'fixture/:id' , component:FixtureComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash:true}),
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
