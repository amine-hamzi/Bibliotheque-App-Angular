import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nonAffiche = true
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogin(form :  any){
     this.authService.login(form)
      this.nonAffiche = false
  }

}
