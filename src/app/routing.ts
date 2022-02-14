import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {LiveComponent} from "./live/live.component";
import {LeagueComponent} from "./league/league.component";
import {FixtureComponent} from "./fixture/fixture.component";
import {AuthModule} from "./auth/auth.module";


const routes : Route[] = [
  {path:'',component:MainPageComponent},
  {path:'live', component:LiveComponent},
  {path:'leagues', component:LeagueComponent},
  {path:'fixture/:id' , component:FixtureComponent},
  {path:'auth', loadChildren: () => AuthModule}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
