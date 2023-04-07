import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { AuthadminGuard } from './authadmin.guard';

const routes: Routes = [
  {path:'' , redirectTo:'admin/categories', pathMatch:'full'},
  {path:'admin/categories',canActivate:[AuthadminGuard], component:CategoriesComponent},
  {path:'admin/authors',canActivate:[AuthadminGuard], component:AuthorsComponent},
  {path:'admin/books',canActivate:[AuthadminGuard], component:BooksComponent},
  {path:'admin/login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
