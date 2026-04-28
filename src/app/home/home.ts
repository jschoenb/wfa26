import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Search} from '../search/search';
import {Book} from '../shared/book';

@Component({
  selector: 'bs-home',
  imports: [
    MatButton,
    RouterLink,
    Search
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  router = inject(Router);
  route = inject(ActivatedRoute);
  protected bookSelected(book: Book) {
        this.router.navigate(['../books',book.isbn],{relativeTo:this.route});
  }
}
