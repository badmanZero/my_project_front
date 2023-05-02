import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

//const API_URL: string = 'http://localhost:8000';
const API_URL: string = environment.api_url;

export interface Info {
  id: Number,
  nom: String,
  prenom: String,
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  authenticate(user: any) {
    let url = API_URL + '/api/login_check';
    const body=JSON.stringify(user);
    const headers = { 'content-type': 'application/json'} 

    return this.http.post(url, body, { headers: headers })
    .pipe(
      map(this.extractData)
      //map((data: Response) => data.json())
    );
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  /*loggedIn() {
    return tokenNotExpired();
  }*/
  loggedIn() {
    
    const token: any = localStorage.getItem('id_token');
    return this.jwtHelper.isTokenExpired(token);
    //return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  /*getUser(){
    const token: any = localStorage.getItem('id_token');
    const userid: any = this.jwtHelper.decodeToken(token);
    return userid;
  }*/

  getUser(){
    const token: any = localStorage.getItem('id_token');
    //const userid: any = atob(token.split('.')[1]);
    const userid: any = this.jwtHelper.decodeToken(token);
    return userid;
  }
  
  /*getInfoUser(username:String){
    return this.http.get(API_URL + '/userCo/test')
  }*/

  getInfoUser(username:String): Observable<Info[]> {
    return this.http.get<Info[]>(API_URL + '/userCo/test')
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }

}
