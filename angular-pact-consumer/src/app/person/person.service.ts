import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getById(id: number): Observable<Person> {
    return this.http.get<Person>(this.baseUrl + `/persons/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(name: string): Observable<Person> {
    const person: Person = { id: undefined, name };
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Person>(this.baseUrl + '/persons', person, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return of(undefined);
    }

    throwError(error);
  }
}
