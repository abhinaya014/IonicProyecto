import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
  path: 'inicio',
  loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule),
  canActivate: [AuthGuard],
  data: { role: ['administrador', 'alumno'] } 

},
{
  path: 'admin/:id', 
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
  canActivate: [AuthGuard],
  data: { role: 'administrador' } 
},

{
  path: 'alumno/:id',  
  loadChildren: () => import('./alumno/alumno.module').then(m => m.AlumnoPageModule),
  canActivate: [AuthGuard],
  data: { role: 'alumno' } 
},
{
  path: 'alta',
  loadChildren: () => import('./alta/alta.module').then(m => m.AltaPageModule),
  canActivate: [AuthGuard],
  data: { role: 'administrador' } 
},
{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
},
{
  path: 'profile',
  loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
  canActivate: [AuthGuard], // Asegúrate de que solo los usuarios logueados accedan al perfil
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
