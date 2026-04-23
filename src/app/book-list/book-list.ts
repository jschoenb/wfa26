import {Component, inject, OnInit, output} from '@angular/core';
import {BookListCardSlot} from '../book-list-card-slot/book-list-card-slot';
import {BookStore} from '../shared/book-store';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'bs-book-list',
  imports: [
    BookListCardSlot,
    RouterLink
  ],
  providers: [{provide: BookStore, useClass:BookStore}],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList{

  private bs = inject(BookStore);
  books= toSignal(this.bs.getAll(),{initialValue:[]});

}
