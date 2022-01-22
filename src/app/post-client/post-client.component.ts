import { Component, OnInit } from '@angular/core';
import {ClientService} from "../service/client.service";

@Component({
  selector: 'app-post-client',
  templateUrl: './post-client.component.html',
  styleUrls: ['./post-client.component.css']
})
export class PostClientComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
  }
  public close() {
    this.display = false;

  }

  onCreate( form: any){
    this.clientService.save(form)
  }

}
