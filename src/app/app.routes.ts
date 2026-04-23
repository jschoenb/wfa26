import { Routes } from '@angular/router';
import {Home} from './home/home';
import {BookList} from './book-list/book-list';
import {BookDetails} from './book-details/book-details';
import {First} from './first/first';
import {Second} from './second/second';

export const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'home', component:Home},
  {path:'books', component:BookList},
  {path:'books/:isbn', component:BookDetails,
    children: [
      {path:'first',component:First},
      {path:'second',component:Second},
    ]
  },
];
