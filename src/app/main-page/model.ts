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

}
export class country {
  id?:number;
  name?:string;
  code?:string;
  urlFlag?:string;

}

export class league {
  id?:number;
  name?:string;
  urlLogo?:string;
  codeCountry?:string;
}
