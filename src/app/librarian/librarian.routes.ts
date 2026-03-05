import { Routes } from "@angular/router";
import { DashboardCompo } from "./dashboard/dashboard-compo/dashboard-compo";
import { BookForm } from "./manage-book/book-form/book-form";
import { UserList } from "./mange_users/user-list/user-list";
import { librarianGuard } from "../auth/guards/librarian-guard";
import { authGuardGuard } from "../auth/guards/auth-guard-guard";

export const lib_ROUTES: Routes =[

    {
        path:'dashboard' ,canActivate:[authGuardGuard,librarianGuard],
        loadComponent:() => import('./dashboard/dashboard-compo/dashboard-compo').then(m => m.DashboardCompo)
    },
    {
        path:'book-list',canActivate:[authGuardGuard,librarianGuard],
        loadComponent:() => import('./manage-book/book-list-lib/book-list') .then(m => m.BookListLib),
    },
    {
        path:'add',canActivate:[authGuardGuard,librarianGuard],
        loadComponent:() => import('./manage-book/book-form/book-form') .then(m => m.BookForm),
    },
    {
        path:'user-list',canActivate:[authGuardGuard,librarianGuard],
        loadComponent:() => import('./mange_users/user-list/user-list') .then(m => m.UserList),
    },
    {
        path:'user-details/:id',canActivate:[librarianGuard],
        loadComponent:() => UserList,
    }
]