import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from "../service/client.service";

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  @Input() email : string = ''
  constructor(private clientService : ClientService) { }

  ngOnInit(): void {
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
  }
  public close() {
    this.display = false;

  }
  onSend(form : any){
    form.toEmail = this.email
    console.log(form)
    this.clientService.post("http://localhost:8088/send",form)
  }
}
