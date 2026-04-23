import { Component, signal } from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {BookList} from './book-list/book-list';
import {SignalTest} from './signal-test/signal-test';
import {Book} from './shared/book';
import {BookDetails} from './book-details/book-details';

@Component({
  selector: 'bs-root',
  imports: [MatSlideToggle, BookList, SignalTest, BookDetails],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  listOn = true;
  detailsOn = false;

  book:Book | undefined;

  protected showList() {
    this.listOn = true;
    this.detailsOn = false;
  }

  protected showDetail(book: Book) {
    this.book = book;
    this.listOn = false;
    this.detailsOn = true;
  }
}
