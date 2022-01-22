import {Component, Input, OnInit} from '@angular/core';
import {LivreService} from "../service/livre.service";
import {CategorieService} from "../service/categorie.service";
import {Livre} from "../model/livre";
import {Pret} from "../model/pret";
import {Categorie} from "../model/categorie";

@Component({
  selector: 'app-put-livre',
  templateUrl: './put-livre.component.html',
  styleUrls: ['./put-livre.component.css']
})
export class PutLivreComponent implements OnInit {

  @Input() isbn: String = ""
  @Input() title: String =""
  @Input() dateCreation: any
  @Input() nbreExemplaires: number = 0
  @Input() auteur: String =""
  @Input() categorie : any
  @Input() self: string =""


  categories : any[]=[]
  constructor( private livreService: LivreService,
              private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe(
      (data)=>{
        this.categories = data._embedded.categories;
      }
    )
  }

  onUpdate(form : any){
    this.livreService.put(this.self,form)
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
  }
  public close() {
    this.display = false;

  }

}
