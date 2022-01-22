import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Categorie} from "../model/categorie";
import {Observable, Subject} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private url = 'http://localhost:8088/categories'
  subject : Subject<any[]> = new Subject<any[]>()
  categories : any[] = []
  headers = new HttpHeaders({'authorization': this.authService.jwtToken})
  constructor(private httpClient : HttpClient, private authService: AuthService) {
    this.loadData()
  }
  loadData(){
    this.httpClient.get<any>(this.url,{headers: this.headers}).subscribe(
      data=>{
        this.categories = data._embedded.categories;
        this.emitCategories()
      }
    )
  }
  emitCategories(){
    this.subject.next(this.categories.slice())
  }
  getCategories() {
    return this.httpClient.get<any>(this.url,{headers: this.headers});
  }
  delete(urlLivre : any){
    this.httpClient.delete(urlLivre,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
        this.emitCategories()
      }
    )

  }
  get(data: any){
    return this.httpClient.get<any>(data,{headers: this.headers})
  }
  save(livre: any){
    this.httpClient.post(this.url, livre,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
        this.emitCategories()
      }
    )
  }
  put(url : any, categorie  : any){
    this.httpClient.put(url,categorie,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
        this.emitCategories()
      }
    )
  }
}
