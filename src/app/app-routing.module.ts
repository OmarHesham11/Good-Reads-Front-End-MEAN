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

const routes: Routes = [
  {path:'' , redirectTo:'admin/categories', pathMatch:'full'},
  {path:'admin/categories',canActivate:[AuthadminGuard], component:CategoriesComponent},
  {path:'admin/authors',canActivate:[AuthadminGuard], component:AuthorsComponent},
  {path:'admin/books',canActivate:[AuthadminGuard], component:BooksComponent},
  {path:'admin/login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'user/books', component:UserbooksComponent},

  {path:'**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
