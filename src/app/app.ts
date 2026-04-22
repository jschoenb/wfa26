import { Component, signal } from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {BookList} from './book-list/book-list';
import {SignalTest} from './signal-test/signal-test';

@Component({
  selector: 'bs-root',
  imports: [MatSlideToggle, BookList, SignalTest],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bookstore26');
}
