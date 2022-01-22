import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Client} from "../model/client";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  subject: Subject<any> = new Subject<any>();
  private url = 'http://localhost:8088/clients'
  private clients :any[]=[]
  headers = new HttpHeaders({'authorization': this.authService.jwtToken})
  constructor(private httpClient : HttpClient, private authService: AuthService) {
    this.loadData()
  }

  loadData(){
    this.httpClient.get<any>(this.url,{headers: this.headers}).subscribe(
      data=>{
        this.clients = data._embedded.clients;
        this.emitClients()
        console.log(this.clients)
      },error => console.log(error)
    )
  }


  emitClients(){
    this.subject.next(this.clients.slice())
  }



  delete(urlClient : any){
    this.httpClient.delete(urlClient,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
      }
    )
  }
  get(data: any){
    return this.httpClient.get<any>(data,{headers:  this.headers})
  }
  save(client: any){
    this.httpClient.post(this.url, client,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
      }
    )
    this.loadData()
  }
  post(url : string, form: any){
    this.httpClient.post(url, form,{headers: this.headers}).subscribe(
      data=>console.log(form)
    )
  }
  put(url: string, client: any){
    this.httpClient.patch(url, client,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
      }
    )
  }


}
