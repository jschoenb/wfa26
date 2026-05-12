import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';

interface Token {
  exp: number;
  user: {
    id : string;
  }
}

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  private api = "http://bookstore26.putz.kwmhgb.at/api/auth"

  private http = inject(HttpClient)
  login(email:string, password:string){
     return this.http.post(`${this.api}/login`,{
       email:email,
       password:password
     })
  }

  public setSessionStorage(token:string){
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("userId",decodedToken.user.id);
  }

  public logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  }

  public isLoggedIn(){
    if(sessionStorage.getItem("token")){
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public isLoggedOut(){
    return !this.isLoggedIn();
  }
}
