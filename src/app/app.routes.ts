import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateFormsComponent } from './forms/create-forms/create-forms.component';
import { EditFormsComponent } from './forms/edit-forms/edit-forms.component';
import { authguardGuard } from './service/authguard.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'proyecto',
    component: ProyectoComponent,
    canActivate: [authguardGuard],
  },
  {
    path: 'task',
    component: TaskListComponent,
    canActivate: [authguardGuard],
  },
  {
    path: 'task/:id',
    component: TaskListComponent,
    canActivate: [authguardGuard],
  },
  {
    path: 'crearuser',
    component: CreateFormsComponent,
    canActivate: [authguardGuard],
  },
  {
    path: 'updatetask/:id',
    component: EditFormsComponent,
    canActivate: [authguardGuard],
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/login'
  },
];
