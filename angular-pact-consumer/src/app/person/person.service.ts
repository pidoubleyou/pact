import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getById(id: number): Observable<Person> {
    return this.http.get<Person>(this.baseUrl + `/persons/${id}`);
  }

  create(name: string): Observable<Person> {
    const person: Person = { id: undefined, name: name };
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Person>(this.baseUrl + '/persons', person, { headers: headers });
  }
}
