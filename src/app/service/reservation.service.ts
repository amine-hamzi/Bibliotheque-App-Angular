import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url = 'http://localhost:8088/reservations'
  subject : Subject<any[]> = new Subject<any[]>()
  reservations : any[] = []
  headers = new HttpHeaders({'authorization': this.authService.jwtToken})
  constructor(private httpClient : HttpClient, private authService: AuthService) {
    this.loadData()
  }
  loadData(){
    this.httpClient.get<any>(this.url,{headers: this.headers}).subscribe(
      data=>{
        this.reservations = data._embedded.reservations;
        this.reservations = this.getLivresAndClients(this.reservations);
        this.emitReservations()
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

  emitReservations(){
    this.subject.next(this.reservations.slice())
  }
  getReservations() {
    return this.httpClient.get<any>(this.url,{headers: this.headers});
  }
  delete(urlReservations : any){
    this.httpClient.delete(urlReservations,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
        this.emitReservations()
      }
    )

  }
  get(data: any){
    return this.httpClient.get<any>(data,{headers: this.headers})
  }
  save(reservation: any){
    this.httpClient.post(this.url, reservation,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
        this.emitReservations()
      }
    )
  }
  put(url : any, reservation  : any){
    this.httpClient.put(url,reservation,{headers: this.headers}).subscribe(
      data=>{
        this.loadData()
        this.emitReservations()
      }
    )
  }
}
