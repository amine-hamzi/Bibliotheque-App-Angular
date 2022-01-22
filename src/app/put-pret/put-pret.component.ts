import {Component, Input, OnInit} from '@angular/core';
import {PretService} from "../service/pret.service";

@Component({
  selector: 'app-put-pret',
  templateUrl: './put-pret.component.html',
  styleUrls: ['./put-pret.component.css']
})
export class PutPretComponent implements OnInit {

  livres : any[] = []
  clients : any[]= []
  @Input()livre : any
  @Input()client : any
  @Input()dateDebut: Date = new Date()
  @Input()dateFin: Date = new Date()
  @Input()self : string =""
  constructor(private pretService: PretService) { }

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
  onUpdate(form : any){
    this.pretService.put(this.self,form)
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
