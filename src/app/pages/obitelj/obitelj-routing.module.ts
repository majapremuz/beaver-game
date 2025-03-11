import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObiteljPage } from './obitelj.page';

const routes: Routes = [
  {
    path: '',
    component: ObiteljPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObiteljPageRoutingModule {}
