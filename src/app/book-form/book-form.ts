import {Component, effect, inject, signal} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {BookFactory} from '../shared/book-factory';
import {Book} from '../shared/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookStore} from '../shared/book-store';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {BookFormErrorMessages} from './book-form-error-messages';
import {BookValidators} from '../shared/book-validators';

@Component({
  selector: 'bs-book-form',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatIconButton,
    MatIcon,
    MatError
  ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bs = inject(BookStore);
  book = signal<Book>(BookFactory.empty());
  isUpdatingBook = signal(false);

  errors: {[key:string]:string}={}

  bookForm = this.fb.group({
    id:0,
    title:['',Validators.required],
    subtitle:'',
    isbn: ['',{
      validators: [
        Validators.required,
        BookValidators.isbnFormat
      ],
      asyncValidators : [this.isUpdatingBook() ? null : BookValidators.isbnExists(this.bs)]
    }],
    description:'',
    rating:[0,[Validators.min(0),Validators.max(5)]],
    published:['',Validators.required],
    images: this.fb.array([])
  })

  constructor() {
    effect(()=>{
      const b = this.book();
      if(!b) return;
      this.setImages(b.images || []);
      if(!this.isUpdatingBook()) return;
      //Form patchen
      this.bookForm.patchValue({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        isbn: b.isbn,
        description: b.description,
        rating: b.rating,
        published: this.formatDate(b.published)
      })

      if(this.isUpdatingBook()){
        this.bookForm.get('isbn')?.disable();
      }
    })

    this.bookForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
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

  get images():FormArray {
    return this.bookForm.get('images') as FormArray;
  }

  private setImages(images:any[]){
    this.images.clear();
    if(!images.length){
      this.addThumbnailControl();
      return;
    }

    for(let img of images){
      this.images.push(
        this.fb.group({
          id: [img.id],
          url: [img.url,Validators.required],
          title: [img.title,Validators.required]
        })
      );
    }
  }

  private formatDate(date:string| Date):string {
    return new Date(date).toISOString().split('T')[0];
  }

  protected addThumbnailControl() {
    this.images.push({
      id:0,
      url:['',Validators.required],
      title:['',Validators.required]
    })
  }

  protected removeThumbnailControl(i: number) {
    if(this.images.length >1){
      this.images.removeAt(i);
    }
  }

  protected submitForm() {
    const raw = this.bookForm.getRawValue();

    const book:Book = BookFactory.fromObject(raw);

    if(this.isUpdatingBook()){
      this.bs.update(book).subscribe(()=>{
        this.router.navigate(['../../books/',book.isbn],{relativeTo:this.route})
      })
    } else {
      book.user_id = 1; // TODO Hack
      this.bs.create(book).subscribe(()=>{
        this.book.set(BookFactory.empty());
        this.router.navigate(['../books/'],{relativeTo:this.route})
      })
    }
  }

  updateErrorMessages(){
    this.errors = {};
    for(const message of BookFormErrorMessages){
      const control = this.bookForm.get(message.forControl);
      if(control && control.dirty && control.invalid
        && control.errors?.[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
