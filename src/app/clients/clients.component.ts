import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Client} from "../model/client";
import {ClientService} from "../service/client.service";
import {Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {PutClientComponent} from "../put-client/put-client.component";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy{

  subscription: any;
  checked='email'
  nonTrouve = false


  clients : any[] = []
  opened : any
  constructor(private clientService : ClientService) {
  }
  ngOnInit(): void {
    this.subscription = this.clientService.subject.subscribe(
      data=>{
        this.clients = data
        console.log(this.clients);
      }
    )
    this.clientService.loadData()
    this.clientService.emitClients();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onDelete(client: any){
    this.clientService.delete(client._links.self.href);
  }

  onSearch(form : any){
    if(form.alias === '' || form.alias === ' '){
      this.clientService.emitClients()
      this.nonTrouve = false;
    }else{
      if(form.filtre === 'email'){
        this.clientService.get("http://localhost:8088/clients/search/findByEmail?email="+form.alias).subscribe(
          data=>{
            this.clients.splice(0,this.clients.length)
            this.clients.push(data)
            this.nonTrouve = false;
          },error => {
            this.nonTrouve = true;
          }
        )
      }else if(form.filtre === 'nom'){
        this.clientService.get('http://localhost:8088/clients/search/findByNomContaining?nom='+form.alias).subscribe(
          data=>{
            this.clients.splice(0,this.clients.length)
            this.clients = data._embedded.clients
            this.nonTrouve = false;
          },error => {
            this.nonTrouve = true;
          }
        )

      }
    }
  }
open(){

}

}
