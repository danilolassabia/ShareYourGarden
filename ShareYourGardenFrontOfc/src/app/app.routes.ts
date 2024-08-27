import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { GardenersComponent } from './components/gardeners/gardeners.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { GardenComponent } from './components/garden/garden.component';
import { PlantRegisterComponent } from './components/plant-register/plant-register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard],
  },
  {
    path: 'garden/:id',
    component: GardenComponent,
    canActivate: [authGuard],
  },
  {
    path: 'gardeners',
    component: GardenersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'plants',
    component: PlantListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'newplant',
    component: PlantRegisterComponent,
    canActivate: [authGuard],
  },
  {
    path: 'editplant/:id',
    component: PlantRegisterComponent,
    canActivate: [authGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [authGuard],
  },
];
