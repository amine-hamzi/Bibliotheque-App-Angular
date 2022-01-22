import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router: Router, private authService : AuthService) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    return new Promise(
      (resolve,reject)=>{
        if(this.authService.roles != undefined){
          resolve(true)
        }else{
          this.router.navigate(['login'])
          reject(false)
        }
      }
      )
  }
}
