import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../service/reservation.service";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations : any[]= []
  checked = 'email'
  subscription : any;
  nonTrouve = false
  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.subscription = this.reservationService.subject.subscribe(
      data=>{
        this.reservations = data
      }
    )
    this.reservationService.loadData()
    this.reservationService.emitReservations()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(reservation: any){
    this.reservationService.delete(reservation._links.self.href);
  }

  onSearch(form : any){
    console.log(form)
    var livre;
    var client;
    if(form.alias === '' || form.alias === ' '){
       this.reservationService.emitReservations()
       this.nonTrouve = false;
     }else{
       if(form.filtre === 'email'){
         this.reservationService.get('http://localhost:8088/clients/search/findByEmail?email='+form.alias).subscribe(
           dataClient=>{
             client = dataClient._links.self.href;
             this.reservationService.get("http://localhost:8088/reservations/search/findByClient?client="+client).subscribe(
               datareservations=>{
                 console.log(datareservations)
                 this.reservations.splice(0,this.reservations.length)
                 this.reservations = datareservations._embedded.reservations
                 this.reservations = this.reservationService.getLivresAndClients(this.reservations)
                 this.nonTrouve = false;
               },error => {
                 this.nonTrouve = true;
               }
             )
           },err=>{
             this.nonTrouve = true;

           }
         )
       }
       else if(form.filtre === 'livre'){
         this.reservationService.get('http://localhost:8088/livres/search/findByIsbn?isbn='+form.alias).subscribe(
           dataLivre=>{
             livre = dataLivre._links.self.href;
             console.log(livre)
             this.reservationService.get("http://localhost:8088/reservations/search/findByLivre?livre="+livre).subscribe(
               datareservations=>{
                 console.log(datareservations)
                 this.reservations.splice(0,this.reservations.length)
                 this.reservations = datareservations._embedded.reservations
                 this.reservations = this.reservationService.getLivresAndClients(this.reservations)
                 this.nonTrouve = false;
               },error => {
                 this.nonTrouve = true;
               }
             )
           },err=>{
             this.nonTrouve = true;

           }
         )
       }
     }
  }

}
