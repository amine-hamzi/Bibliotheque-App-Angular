import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../service/reservation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-reservation',
  templateUrl: './post-reservation.component.html',
  styleUrls: ['./post-reservation.component.css']
})
export class PostReservationComponent implements OnInit {

  livres : any[] = []
  clients : any[]= []
  constructor(private reservationService: ReservationService,private router: Router) {

  }

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

  onCreate(form : any){
    form.date = Date.now()
    this.reservationService.save(form)
    this.router.navigate(['reservations'])
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
  }
  public close() {
    this.display = false;

  }
}
