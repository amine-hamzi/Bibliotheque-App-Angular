import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ClientService} from "./client.service";
import {LivreService} from "./livre.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PretService {

  private prets: any[]= []
  subject : Subject<any[]> = new Subject<any[]>()
  url="http://localhost:8088/prets"
  headers = new HttpHeaders({'authorization': this.authService.jwtToken})
  constructor(private  httpClient: HttpClient, private authService : AuthService) {
    this.loadData()
  }
  loadData(){
    this.httpClient.get<any>(this.url,{headers: this.headers}).subscribe(
      data=>{
        this.prets = data._embedded.prets
        this.prets = this.getLivresAndClients(this.prets);
        this.emitPrets()
      }
    )
  }

  getLivresAndClients(listePrets: any[]){
    listePrets.forEach(
      (value) => {
        this.httpClient.get(value._links.client.href,{headers: this.headers}).subscribe(
          data=>{
            value.client = data
          }
        )
        this.httpClient.get(value._links.livre.href,{headers: this.headers}).subscribe(
          data=>{
            value.livre = data
          }
        )
      }
    )
    return listePrets;
  }
  emitPrets(){
    this.subject.next(this.prets.slice())
  }


  delete(urlPret : any){
    this.httpClient.delete(urlPret,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
      }
    )
  }
  get(data: any){
    return this.httpClient.get<any>(data,{headers: this.headers})
  }
  save(pret: any){
    this.httpClient.post(this.url, pret,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
      }
    )
    this.loadData()
  }
  put(url: string, pret: any){
    this.httpClient.patch(url, pret,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
      }
    )
  }
}
