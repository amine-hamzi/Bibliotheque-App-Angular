import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private host:string="http://localhost:8088";
  jwtToken:any;
  subject: Subject<any> = new Subject<any>();
  roles: any
  private username: any;
  constructor(private http:HttpClient, private router : Router){}



  login(user: any) {
    let form = {
      username : user.username,
      password : user.password
    }
    this.http.post(this.host+"/login",form,{ observe: 'response'}).subscribe(
      data=>{
        this.jwtToken = data.headers.get('Authorization')
        if(user.rememberMe === 'rememberMe'){
          this.saveToken(this.jwtToken)
        }
        this.parseJwt()
        this.router.navigate(['home'])
      },error => {
        console.log(error)
      }
  )
  }

  saveToken(jwtToken: any){
    this.jwtToken=jwtToken;
    localStorage.setItem("token",jwtToken);
  }

  parseJwt(){
    const helper = new JwtHelperService();
    let jwt = helper.decodeToken(this.jwtToken)
    this.roles=jwt?.roles;
    this.username = jwt?.obj;
  }

  isAuthenticated(){
    return this.roles != undefined;
  }

  loadToken(){
    this.jwtToken=localStorage.getItem('token');
    this.parseJwt();
  }

  logout(){
    localStorage.removeItem('token');
    this.roles = undefined
    this.username = undefined
    this.jwtToken = undefined
  }

  emitToken(){
    this.subject.next(this.jwtToken);
  }

}
