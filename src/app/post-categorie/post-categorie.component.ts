import { Component, OnInit } from '@angular/core';
import {Categorie} from "../model/categorie";
import {CategorieService} from "../service/categorie.service";

@Component({
  selector: 'app-post-categorie',
  templateUrl: './post-categorie.component.html',
  styleUrls: ['./post-categorie.component.css']
})
export class PostCategorieComponent implements OnInit {

  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {
  }

  onCreate( form: any){
    this.categorieService.save(form)
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
  }
  public close() {
    this.display = false;

  }
}
