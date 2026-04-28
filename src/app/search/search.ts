import {Component, effect, inject, output, signal} from '@angular/core';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {toObservable} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs';
import {BookStore} from '../shared/book-store';
import {Book} from '../shared/book';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';

@Component({
  selector: 'bs-search',
  imports: [
    MatFormField,
    MatLabel,
    MatIcon,
    MatInput,
    MatSuffix,
    MatProgressSpinner,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  searchTerm = signal<string>('');
  foundBooks = signal<Book[]>([]);
  private bs = inject(BookStore);
  isLoading = false;
  bookSelected = output<Book>()
  constructor() {
      toObservable(this.searchTerm).pipe(
        filter(term => term!=""),
        debounceTime(500),
        distinctUntilChanged(),
        tap(()=> this.isLoading = true),
        switchMap(searchTerm => this.bs.getAllSearch(searchTerm)),
        tap(()=> this.isLoading = false)
      ).subscribe(books => {
        console.log(books);
        this.foundBooks.set(books);
      })
  }
  protected update(value: string) {
    this.searchTerm.set(value);
  }

  protected selectBook(book: Book) {
    this.bookSelected.emit(book);
  }
}
