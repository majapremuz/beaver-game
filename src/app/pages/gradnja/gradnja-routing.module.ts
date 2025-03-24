import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradnjaPage } from './gradnja.page';

const routes: Routes = [
  {
    path: '',
    component: GradnjaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradnjaPageRoutingModule {}
