export class fixture {
  idFixture?:number;
  dateTime?:Date;
  shortStatus?:string;
  longStatus?:string;
  elapsed?:number;
  leagueid?:number;
  idHome?:number;
  idAway?:number;
  nameHome?:string;
  nameAway?:string;
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
  countryFlag?:string;
  countryName?:string;
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
