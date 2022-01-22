import {Component, Input, OnInit} from '@angular/core';
import {ReservationService} from "../service/reservation.service";

@Component({
  selector: 'app-put-reservation',
  templateUrl: './put-reservation.component.html',
  styleUrls: ['./put-reservation.component.css']
})
export class PutReservationComponent implements OnInit {


  livres : any[] = []
  clients : any[]= []
  @Input()livre : any
  @Input()client : any
  @Input()date: Date = new Date()
  @Input()self : string =""
  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.get("http://localhost:8088/livres").subscribe(
      data=>{
        this.livres = data._embedded.livres
      }
    )
    this.reservationService.get("http://localhost:8088/clients").subscribe(
      data=>{
        this.clients = data._embedded.clients
      }
    )
  }
  onUpdate(form : any){
    this.reservationService.put(this.self,form)
    console.log(form)
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
  }
  public close() {
    this.display = false;

  }
}
