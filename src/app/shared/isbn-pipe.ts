import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbn',
})
export class IsbnPipe implements PipeTransform {
  transform(value: string | null | undefined, addPrefix = false): string | null {
    if(!value) return null;
    const normalized = value.replace(/-/g,'');
    if(normalized.length !==10 && normalized.length !==13){
      return null;
    }
    const prefix = addPrefix ? (normalized.length === 10 ? 'ISBN-10: ' : 'ISBN-13'):'';

    if(normalized.length===10){
      return prefix + normalized;
    }
    return `${prefix}${normalized.substring(0,3)}-${normalized.substring(3)}`;
  }
}
