import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {AuthModule} from "./auth.module";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes : Route[] = [
  {path:'',component:LoginComponent} ,
  {path:'register',component:RegisterComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
