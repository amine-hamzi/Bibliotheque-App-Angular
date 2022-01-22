import {Categorie} from "./categorie";
import {Pret} from "./pret";

export class Livre {
  prets : Pret[] = []
  public isbn: String = ""
  public title: String =""
  public dateCreation: Date = new Date()
  public nbreExemplaires: number = 0
  public auteur: String =""
  public categorie : Categorie = new Categorie();
}
