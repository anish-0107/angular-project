import { Routes } from '@angular/router';
import { librarianGuard } from '../auth/guards/librarian-guard';

export const BOOK_ROUTES: Routes = [
    // this all route are forwaek to books  eg. book/details
  {
    path: '', 
    loadComponent: () => import('./book-list/book-list').then(m => m.BookList)
  },
  {
    path: 'details', 
    loadComponent: () => import('./book-details/book-details').then(m => m.BookDetails)
    ,canActivate:[librarianGuard]
  },
  {path:'list',
    loadComponent:() => import('./book-list/book-list'). then(a=> a.BookList),
    canActivate:[librarianGuard]
  },
  {
    path:'pbook/:id',
    loadComponent: () => import('./book-details/book-details').then(m => m.BookDetails),
    canActivate:[librarianGuard]
  },
  
]