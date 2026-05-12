import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {BookStore} from './book-store';
import {map, Observable, of} from 'rxjs';

export class BookValidators {
  static isbnFormat(control: AbstractControl):ValidationErrors | null {
    if(control.value) return null;
    const isolatedNumbers = control.value.replace(/-/g,'');
    const isbnPattern = /(^\d{10}$)|(^\d{13}$)/;
    return isbnPattern.test(isolatedNumbers) ? null : {isbnFormat: true}
  }

  static isbnExists(bs:BookStore): AsyncValidatorFn {
    return (control:AbstractControl): Observable<ValidationErrors | null> =>{
      if(!control.value) return of(null);
      return bs.check(control.value).pipe(
        map(exists => exists ? {isbnExists:true}:null)
      )
    }
  }
}
