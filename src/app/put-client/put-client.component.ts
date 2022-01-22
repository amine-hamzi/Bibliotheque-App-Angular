import {Component, Injectable, Input, OnInit} from '@angular/core';
import {IcuPlaceholder} from "@angular/compiler/src/i18n/i18n_ast";
import {ClientService} from "../service/client.service";
import {Subscription} from "rxjs";
@Injectable()
@Component({
  selector: 'app-put-client',
  templateUrl: './put-client.component.html',
  styleUrls: ['./put-client.component.css']
})
export class PutClientComponent implements OnInit {

  @Input() nom: String=""
  @Input() prenom: String=""
  @Input() travail: String=""
  @Input() adresse: String=""
  @Input() email: String=""
  @Input() dateCreation: any
  @Input() self: string=""
  constructor(private clientService: ClientService) {

  }

  ngOnInit(): void {
  }


  display: boolean = false;
  showDialog() {
    this.display = true;
  }
  public close() {
    this.display = false;

  }

  onUpdate( form: any){
    this.clientService.put(this.self, form)
    console.log(this.dateCreation)
  }

}
