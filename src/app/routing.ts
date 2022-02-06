import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";




const routes : Route[] = [
  {path:'',component:MainPageComponent},


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
