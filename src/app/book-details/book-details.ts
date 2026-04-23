import {Component, input, output} from '@angular/core';
import {Book} from '../shared/book';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDivider} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'bs-book-details',
  imports: [
    MatCard,
    MatCardContent,
    MatDivider,
    MatIcon,
    MatButton
  ],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
})
export class BookDetails {
  book = input.required<Book>()
  showList = output<any>()
  getRating(num: number) {
    return Array.from({length:num})
  }

  protected showBookList() {
    this.showList.emit(null);
  }
}
