import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: "full"},
  { path: 'login', component: LoginComponent },
  { 
    path: 'vmaster', 
    loadChildren: () => import("./pages/pages-wrapper/pages-wrapper.module").then(m => m.PagesWrapperModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
