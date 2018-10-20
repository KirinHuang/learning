import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'

import { MessagesService } from './messages.service'
import { Hero } from './hero'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  herosUrl = 'api/heros';

  constructor(
    private messageService: MessagesService,
    private http: HttpClient
  ) { }

  getHero (id: number): Observable<Hero> {
    const url = `${this.herosUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`HelloService: fetch hero by id=${id}`)),
      catchError(this.handleError<Hero>('getHero'))
    )
  }

  log (message: string) {
    this.messageService.add(message)
  }

  getHeros (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.herosUrl).pipe(
      tap(heros => {
        this.log('fetch heros ')
      }),
      catchError(this.handleError('getHeros', []))
    )
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.herosUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero (hero: Hero): Observable<Hero> {
    const newHero = new Hero()
    return this.http.post(this.herosUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`add hero name=${hero.name}`)),
      catchError(this.handleError<any>('add Hero', {}))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
