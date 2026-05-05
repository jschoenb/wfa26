import {Book} from './book';

export class BookFactory {
  static empty():Book {
    return new Book(0,'','',[],
      new Date(),0,'',0,
      [{id:0,url:'',title:''}],'');
  }

  static fromObject(raw:any):Book {
    return new Book(
      raw.id,
      raw.isbn,
      raw.title,
      raw.authors,
      typeof (raw.published)==='string'?
        new Date(raw.published) : raw.published,
      raw.user_id,
      raw.subtitle,
      raw.rating,
      raw.images,
      raw.description
    )
  }
}
