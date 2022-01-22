import {Client} from "./client";
import {Livre} from "./livre";

export class Pret {
  constructor(public id : number, public dateDebut : Date,public dateFin : Date,
              public client: Client, public livre : Livre) {
  }
}
