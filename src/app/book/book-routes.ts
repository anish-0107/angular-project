import { Routes } from '@angular/router';
import { librarianGuard } from '../auth/guards/librarian-guard';
import { authGuardGuard } from '../auth/guards/auth-guard-guard';

export const BOOK_ROUTES: Routes = [
  // this all route are forwaek to books  eg. book/details
  {
    path: '', pathMatch: 'full',
    loadComponent: () => import('./book-list/book-list').then(m => m.BookList)
  },
  {
    path: 'list',
    loadComponent: () => import('./book-list/book-list').then(a => a.BookList)
  },
  {
    path: 'list/:id',
    canActivate:[authGuardGuard],
    loadComponent: () => import('./book-details/book-details').then(m => m.BookDetails)
  },
  // {
  //   path:'book/:id',
  //   loadComponent: () => import('./book-details/book-details').then(m => m.BookDetails),
  // },

]