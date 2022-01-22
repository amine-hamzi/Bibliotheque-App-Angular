import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Livre} from "../model/livre";
import {Observable, Subject} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private url = 'http://localhost:8088/livres'

  private livres : any[] = []
  livresSubject : Subject<any[]> = new Subject<any[]>()
  headers = new HttpHeaders({'authorization': this.authService.jwtToken})

  constructor(private httpClient : HttpClient, private authService: AuthService) {
    this.loadData()
  }

  loadData(){
    this.httpClient.get<any>(this.url,{headers: this.headers}).subscribe(
      data=>{
        this.livres = data._embedded.livres;
        this.livres = this.getCategories(this.livres)
        this.emitLivres()
        console.log(this.livres)
      },error => console.log(error)
    )
  }
  getCategories(listeLivres : any[]){
    listeLivres.forEach(
      value => {
        this.httpClient.get(value._links.categorie.href,{headers: this.headers}).subscribe(
          data=>value.categorie=data
        )
      }
    )
    return listeLivres
  }
  emitLivres(){
    this.livresSubject.next(this.livres.slice())
  }
  delete(urlLivre : any){
    this.httpClient.delete(urlLivre,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
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
      }
    )
    this.loadData()
  }
  put(url: string, livre: any){
    this.httpClient.patch(url, livre,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
      }
    )
  }
}
