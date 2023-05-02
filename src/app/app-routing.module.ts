import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: AuthentificationComponent },
    { path: 'movies', 
      component: MovieListComponent,
      canActivate: [AuthGuard] },
    { path: 'tasks', 
      component: TaskListComponent,
      canActivate: [AuthGuard]
    },
    { path: 'taskCreate', 
      component: TaskCreateComponent,
      canActivate: [AuthGuard] },
    { path: 'taskDetail/:id', 
      component: TaskDetailComponent,
      canActivate: [AuthGuard] },
    { path: 'profil', 
      component: ProfilComponent,
      canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
