import { Component, OnInit } from '@angular/core';
import {CategorieService} from "../service/categorie.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  subscription : any;
  nonTrouve = false
  categories  : any[]=[]
  constructor(private categorieService : CategorieService) { }

  ngOnInit(): void {
    this.categorieService.subject.subscribe(
      data=>{
        this.categories = data
      }
    )
    this.categorieService.emitCategories();

  }
  onDelete(categorie : any){
    this.categorieService.delete(categorie._links.self.href)
  }
  onSearch(form : any){
    if(form.alias === '' || form.alias === ' '){
      this.categorieService.emitCategories()
      this.nonTrouve = false;
    }
    else{
        this.categorieService.get("http://localhost:8088/categories/search/findByLabelContaining?label="+form.alias).subscribe(
          data=>{
            this.categories.splice(0,this.categories.length)
            this.categories= data._embedded.categories
            this.nonTrouve = false;
            if(this.categories.length === 0){
              this.categorieService.emitCategories()
              this.nonTrouve = true;
            }
          },error => {
            this.nonTrouve = true;
          }
        )

    }
  }

}
