import {Component, OnDestroy, OnInit} from '@angular/core';
import {LivreService} from "../service/livre.service";
import {Livre} from "../model/livre";
import {CategorieService} from "../service/categorie.service";
import {Categorie} from "../model/categorie";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit, OnDestroy{

  livres : any[] = [];
  checked ='isbn'
  subscription : any ;
  nonTrouve = false
  constructor(private livreService : LivreService,
              private categorieService : CategorieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.livreService.livresSubject.subscribe(data=>{
      this.livres = data
    })
    this.livreService.loadData()
    this.livreService.emitLivres()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(livre : any){
    this.livreService.delete(livre._links.self.href)
  }

  onSearch(form : any){
    if(form.alias === '' || form.alias === ' '){
      this.livreService.emitLivres()
      this.nonTrouve = false;
    }else{
      if(form.filtre === 'isbn'){
        this.livreService.get('http://localhost:8088/livres/search/findByIsbn?isbn='+form.alias).subscribe(
          data=>{
            this.livres.splice(0,this.livres.length)
            this.livres.push(data)
            this.livres = this.livreService.getCategories(this.livres)
            this.nonTrouve = false;
          },error => {
            this.nonTrouve = true;
          }
        )
      }else if(form.filtre === 'titre'){
        this.livreService.get('http://localhost:8088/livres/search/findByTitleContaining?titre='+form.alias).subscribe(
          data=>{
            this.livres.splice(0,this.livres.length)
            this.livres = data._embedded.livres
            this.livres = this.livreService.getCategories(this.livres)
            this.nonTrouve = false;
          },error => {
            this.nonTrouve = true;
          }
        )

      }
    }
  }
}
