import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ReadyPageGuard } from './guards/ready-page.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [ReadyPageGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'obitelj',
    loadChildren: () => import('./pages/obitelj/obitelj.module').then( m => m.ObiteljPageModule)
  },
  {
    path: 'staniste',
    loadChildren: () => import('./pages/staniste/staniste.module').then( m => m.StanistePageModule)
  },
  {
    path: 'gradnja',
    loadChildren: () => import('./pages//gradnja/gradnja.module').then( m => m.GradnjaPageModule)
  },
  {
    path: 'okolis',
    loadChildren: () => import('./pages/okolis/okolis.module').then( m => m.OkolisPageModule)
  },
  {
    path: 'zastita',
    loadChildren: () => import('./pages/zastita/zastita.module').then( m => m.ZastitaPageModule)
  },
  {
    path: 'end',
    loadChildren: () => import('./pages/end/end.module').then( m => m.EndPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
