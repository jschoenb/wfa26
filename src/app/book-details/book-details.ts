import {Component, inject, OnInit, signal} from '@angular/core';
import {Book} from '../shared/book';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDivider} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {BookStore} from '../shared/book-store';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, switchMap} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {DatePipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'bs-book-details',
  imports: [
    MatCard,
    MatCardContent,
    MatDivider,
    MatIcon,
    MatButton,
    RouterLink,
    RouterOutlet,
    UpperCasePipe,
    DatePipe
  ],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
})
export class BookDetails {
  private bs = inject(BookStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  book = toSignal(
    this.route.params.pipe(
      switchMap(({ isbn }) => this.bs.getSingle(isbn))
    ),
    { initialValue: null }
  );

  getRating(num: number) {
    return Array.from({length:num})
  }

  protected removeBook() {
    const b = this.book();
    if(!b) return;
    if(confirm("Soll das Buch wirklich gelöscht werden?")){
      this.bs.remove(b.isbn).subscribe({
        next:()=>{
          this.router.navigate(['../'],{relativeTo:this.route})
          this.toastr.success('Buch gelöscht',"Bookstore")
        },
        error: (err)=>{
          console.error('Delete failed ',err);
          this.toastr.error("Buch konnte nicht gelöscht werden!","Bookstore")
        }
      })
    }
  }
}
