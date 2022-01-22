import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Livre} from "../model/livre";
import {LivreService} from "../service/livre.service";
import {CategorieService} from "../service/categorie.service";
import {Categorie} from "../model/categorie";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-post-livre',
  templateUrl: './post-livre.component.html',
  styleUrls: ['./post-livre.component.css']
})
export class PostLivreComponent implements OnInit {


  categories : any[]=[]
  constructor(private livreService: LivreService,
              private categorieService: CategorieService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe(
      (data)=>{
        this.categories = data._embedded.categories;
      }
    )
  }

  onCreate(form : any){
    form.dateCreation = Date.now()
    this.livreService.save(form)
    console.log(form)
    this.router.navigate(['livres'])
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
  }
  public close() {
    this.display = false;

  }

}
