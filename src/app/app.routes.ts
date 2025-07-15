import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './services/auth.gaurd';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    loadComponent: ()=> import('./about/about.component').then((m)=>m.AboutComponent)
    // component: AboutComponent,
  },
  {
    path: 'jobposts',
    loadComponent: ()=> import('./job-posts/job-posts.component').then((m)=>m.JobPostsComponent),
    canActivate:[authGuard]
    // component: JobPostsComponent,
  },
  {
    path: 'jobposts/:id',
    loadComponent: ()=> import('./view-job/view-job.component').then((m)=>m.ViewJobComponent),
    canActivate:[authGuard]
    // component: ViewJobComponent,
  },
  
  {
    path: 'postjob',
    loadComponent: ()=> import('./post-ajob/post-ajob.component').then((m)=>m.PostAJobComponent),
    canActivate:[authGuard]
    // component: PostAJobComponent,
  },
  {
    path: 'applicationForm',
    loadComponent: ()=> import('./application/application.component').then((m)=>m.ApplicationComponent),
    canActivate:[authGuard]
  }

];
