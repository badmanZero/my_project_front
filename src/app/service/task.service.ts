import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



export interface Task {
  id: Number,
  name: String,
  description: String,
  affectation: Number,
  etat: String,
  type: String
  //isUpdating: boolean
}

export interface State {
  id: Number,
  name: String
}

export interface Type {
  id: Number,
  name: String
}

export interface User {
  id: Number,
  nom: String,
  prenom: String
}

//const API_URL: string = 'http://localhost:8000';
const API_URL: string = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(API_URL + '/tasks')
  }

  getTaskById(id:String){
    return this.http.get(API_URL + '/tasks/' + id)
  }

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(API_URL + '/states')
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/utilisateurs')
  }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(API_URL + '/types')
  }

addTask(task:Task): Observable<Task> {
  const body=JSON.stringify(task);
  const headers = { 'content-type': 'application/json'} 
	/*let httpHeaders = new HttpHeaders({
		'Content-Type' : 'application/json',
		'Cache-Control': 'no-cache'
	});*/

	return this.http.post(API_URL + '/tasks', body, { headers: headers })
  .pipe(
		map(this.extractData),
		catchError(this.handleErrorObservable)
	);
} 

private extractData(res: any) {
	let body = res;
	return body;
}
private handleErrorObservable(error: any) {
	console.error(error);
	return throwError(error);
}



  /*addTask(task:Task): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(task);
    console.log('test:'+ body)
    return this.http.post(API_URL + '/tasks', body,{'headers':headers, observe: 'response'})
    .subcribe((err: HttpErrorResponse) => {
      // simple logging, but you can do a lot more, see below
      console.error('An error occurred:', err.error);
    });
  }*/
}
