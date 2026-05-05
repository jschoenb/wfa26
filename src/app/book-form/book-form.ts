import {Component, effect, inject, signal} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {BookFactory} from '../shared/book-factory';
import {Book} from '../shared/book';
import {ActivatedRoute} from '@angular/router';
import {BookStore} from '../shared/book-store';

@Component({
  selector: 'bs-book-form',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private bs = inject(BookStore);
  book = signal<Book>(BookFactory.empty());
  isUpdatingBook = signal(false);

  bookForm = this.fb.group({
    id:0,
    title:''
  })

  constructor() {
    effect(()=>{
      const b = this.book();
      if(!b) return;
      if(!this.isUpdatingBook()) return;
      //Form patchen
      this.bookForm.patchValue({
        id: b.id,
        title: b.title
      })
    })
  }

  ngOnInit() {
    const isbn = this.route.snapshot.params['isbn'];
    if(isbn){ //editieren
      this.isUpdatingBook.set(true);
      this.bs.getSingle(isbn).subscribe(book => {
        this.book.set(book);
      })
    } else { //neu anlegen
      this.book.set(BookFactory.empty());
    }
  }

}
