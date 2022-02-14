export class fixture {
  id?:number;
  dateTime?:Date;
  shortStatus?:string;
  longStatus?:string;
  elapsed?:number;
  leagueid?:number;
  idHome?:string;
  idAway?:string;
  goalsHome?:number;
  goalsAway?:number;
  timestamp?:number;

}
export class country {
  id?:number;
  name?:string;
  code?:string;
  urlFlag?:string;

}

export class league {
  idLeague?:number;
  name?:string;
  logo?:string;
  codeCountry?:string;
}

export class user {
  idUser?:number;
  privilege:boolean;
  username:string;
  name:string;
  surname:string;
  email:string;
  password:string;
}
