import {Component, OnDestroy, OnInit} from '@angular/core';
import {PretService} from "../service/pret.service";

@Component({
  selector: 'app-prets',
  templateUrl: './prets.component.html',
  styleUrls: ['./prets.component.css']
})
export class PretsComponent implements OnInit, OnDestroy {

  prets : any[]= []
  checked = 'email'
  subscription : any;
  nonTrouve = false
  constructor(private pretService: PretService) { }

  ngOnInit(): void {
    this.subscription = this.pretService.subject.subscribe(
      data=>{
        this.prets = data
      }
    )
    this.pretService.loadData()
    this.pretService.emitPrets()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onDelete(pret: any){
    this.pretService.delete(pret._links.self.href);
  }
  onSearch(form : any){
    //console.log(form)
    var client;
    if(form.alias === '' || form.alias === ' '){
      this.pretService.emitPrets()
      this.nonTrouve = false;
    }else{
      if(form.filtre === 'email'){
        this.pretService.get('http://localhost:8088/clients/search/findByEmail?email='+form.alias).subscribe(
          dataClient=>{
            client = dataClient._links.self.href;
            this.pretService.get("http://localhost:8088/prets/search/findByClient?client="+client).subscribe(
              dataPrets=>{
                console.log(dataPrets)
                this.prets.splice(0,this.prets.length)
                this.prets = dataPrets._embedded.prets
                this.prets = this.pretService.getLivresAndClients(this.prets)
                this.nonTrouve = false;
              },error => {
                this.nonTrouve = true;
              }
            )
          },err=>{
            this.nonTrouve = true;

          }
        )
      }else if(form.filtre === 'date'){
        console.log(form.alias);
        this.pretService.get('http://localhost:8088/prets/search/findByDateDebutLessThanEqual?date='+form.alias).subscribe(
          data=>{
            console.log(data);
            this.prets.splice(0,this.prets.length)
            this.prets = data._embedded.prets
            this.prets = this.pretService.getLivresAndClients(this.prets)
            this.nonTrouve = false;
          },error => {
            this.nonTrouve = true;
          }
        )

      }
    }
  }


}
