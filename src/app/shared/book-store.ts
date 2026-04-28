import {inject, Injectable} from '@angular/core';
import {Book, Author, Image} from './book';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStore {
  private api = "http://bookstore26.putz.kwmhgb.at/api";

  http = inject(HttpClient);

  getAll(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(`${this.api}/books`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(isbn:string):Observable<Book>{
    return this.http.get<Book>(`${this.api}/books/${isbn}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(isbn:string):Observable<any>{
    return this.http.delete(`${this.api}/books/${isbn}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllSearch(searchTerm:string):Observable<Array<Book>> {
  return this.http.get<Array<Book>>(`${this.api}/books/search/${searchTerm}`)
    .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error:Error | any): Observable<any>{
    return throwError(error);
  }
}
