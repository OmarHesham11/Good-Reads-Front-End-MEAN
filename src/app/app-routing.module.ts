import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './components/admin-authors/authors.component';
import { BooksComponent } from './components/admin-books/books.component';
import { CategoriesComponent } from './components/admin-categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthadminGuard } from './guard/authadmin.guard';
import { HomeComponent } from './components/home/home.component';
import { UserbooksComponent } from './components/userbooks/userbooks.component';
import { AllbooksComponent } from './components/allbooks/allbooks.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { CategoryComponent } from './components/category/category.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AuthUserGuard } from './guard/auth-user.guard';

const routes: Routes = [
  {path:'' , redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'admin/categories',canActivate:[AuthadminGuard], component:CategoriesComponent},
  {path:'admin/authors',canActivate:[AuthadminGuard], component:AuthorsComponent},
  {path:'admin/books',canActivate:[AuthadminGuard], component:BooksComponent},
  {path:'admin/login', component:LoginComponent},
  {path:'user/login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'userhome', canActivate:[AuthUserGuard], component:UserHomeComponent},
  { path: 'books', component: AllbooksComponent },
  { path: 'book/:id', component: BooksComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'author/:id', component: AuthorDetailsComponent },
  { path: 'user/books', component: UserbooksComponent },
  { path: 'category/:id', component:CategoryComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
