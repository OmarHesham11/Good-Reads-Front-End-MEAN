import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './components/admin-authors/authors.component';
import { BooksComponent } from './components/admin-books/books.component';
import { CategoriesComponent } from './components/admin-categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthadminGuard } from './guard/authadmin.guard';
import { UserbooksComponent } from './components/userbooks/userbooks.component';
import { AllbooksComponent } from './components/allbooks/allbooks.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { CatedoryComponent } from './components/catedory/catedory.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin/categories', pathMatch: 'full' },
  { path: 'books', component: AllbooksComponent },
  { path: 'book/:id', component: BooksComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'author/:id', component: AuthorDetailsComponent },
  { path: 'admin/categories', canActivate: [AuthadminGuard], component: CategoriesComponent },
  { path: 'admin/authors', canActivate: [AuthadminGuard], component: AuthorsComponent },
  { path: 'admin/books', canActivate: [AuthadminGuard], component: BooksComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/books', component: UserbooksComponent },
  { path: 'user/category', component:CatedoryComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
