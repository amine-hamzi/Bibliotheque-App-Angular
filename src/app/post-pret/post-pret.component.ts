import { Component, OnInit } from '@angular/core';
import {PretService} from "../service/pret.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-pret',
  templateUrl: './post-pret.component.html',
  styleUrls: ['./post-pret.component.css']
})
export class PostPretComponent implements OnInit {

  livres : any[] = []
  clients : any[]= []
  livre : any
  client : any
  dateDebut: Date= new Date()
  dateFin: Date= new Date()
  constructor(private pretService: PretService,private router: Router) {

  }

  ngOnInit(): void {
    this.pretService.get("http://localhost:8088/livres").subscribe(
      data=>{
        this.livres = data._embedded.livres
      }
    )
    this.pretService.get("http://localhost:8088/clients").subscribe(
      data=>{
        this.clients = data._embedded.clients
      }
    )
  }

  onCreate(form : any){
    this.pretService.save(form)
    this.router.navigate(['prets'])
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
  }
  public close() {
    this.display = false;

  }
}
