import { Routes } from '@angular/router';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner';
import { Mybooks } from './mybooks/mybooks';
import { authGuardGuard } from './auth/guards/auth-guard-guard';

export const routes: Routes = [
    // this meansn array of routes is prsent to loas children
    {
        path: 'book',
        loadChildren: () => import('./book/book-routes').then(m => m.BOOK_ROUTES)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-routes').then(m => m.Auth_routes)
    },
    {
        path: 'spinner', component: LoadingSpinner
    },
    {
        path: 'my-books', component: Mybooks, canActivate:[authGuardGuard]
    },
    {
       path:'librarian' ,loadChildren:() => import ('./librarian/librarian.routes').then(m =>m.lib_ROUTES)
    },
    { path: '**', redirectTo: 'auth/login' }

];
