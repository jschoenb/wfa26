import {Component, inject, OnInit, signal} from '@angular/core';
import {Book} from '../shared/book';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDivider} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {BookStore} from '../shared/book-store';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, switchMap} from 'rxjs';

@Component({
  selector: 'bs-book-details',
  imports: [
    MatCard,
    MatCardContent,
    MatDivider,
    MatIcon,
    MatButton,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
})
export class BookDetails {
  private bs = inject(BookStore);
  private route = inject(ActivatedRoute);

  book = toSignal(
    this.route.params.pipe(
      switchMap(({ isbn }) => this.bs.getSingle(isbn))
    ),
    { initialValue: null }
  );



  getRating(num: number) {
    return Array.from({length:num})
  }
}
