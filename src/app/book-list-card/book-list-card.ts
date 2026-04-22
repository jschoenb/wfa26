import {Component, input} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {Book} from '../shared/book';
import {bench} from 'vitest';

@Component({
  selector: 'bs-book-list-card',
    imports: [
        MatCard,
        MatCardContent
    ],
  templateUrl: './book-list-card.html',
  styleUrl: './book-list-card.scss',
})
export class BookListCard {
  book = input.required<Book>();
  protected readonly bench = bench;
}
