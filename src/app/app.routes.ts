import { Routes } from '@angular/router';
import {Home} from './home/home';
import {BookList} from './book-list/book-list';
import {BookDetails} from './book-details/book-details';
import {First} from './first/first';
import {Second} from './second/second';
import {BookForm} from './book-form/book-form';
import {Login} from './login/login';
import {canNavigateToAdminGuard} from './can-navigate-to-admin-guard';

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
  {path: 'admin', component:BookForm, canActivate:[canNavigateToAdminGuard]},
  {path: 'admin/:isbn',component: BookForm, canActivate:[canNavigateToAdminGuard]},
  {path: 'login', component:Login},
];
