import { Injectable } from '@angular/core';
//import { HttpClient , HttpHeaders , RequestOptions } from '@angular/common/http';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: Number,
  title: String,
  count: Number,
  isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
providedIn: 'root'
})
export class MovieService {

  //private accessToken;
  //private headers;

  constructor(private http: HttpClient) {
      //this.init();
  }

  /*private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }*/

  /** GET heroes from the server */
    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(API_URL + '/movies')
    }
  /*async init() {
      this.headers = new HttpHeaders({
          Authorization: 'Bearer'
      });
  }*/

  /*getMovies(): Observable<Movie[]> {
      return this.http.get(API_URL + '/movies',
          new RequestOptions({ headers: this.headers })
      )
      .map(res => res.json());
  }*/

  /*getMovies(){
        //return this.http.get(API_URL + '/movies');
        //return this.http.get('http://localhost:8000/movies');
        return "test";
    }*/
}
