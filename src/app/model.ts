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
  idCountry?:number;
  name?:string;
  code?:string;
  flag?:string;

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
  privilege:number;
  username:string;
  name:string;
  surname:string;
  email:string;
  password:string;
}
