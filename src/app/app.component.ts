import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {ActivatedRoute, UrlSegment} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Bibliotheque';
  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.authService.loadToken();
  }
  logout(){
    this.authService.logout()
  }

}
