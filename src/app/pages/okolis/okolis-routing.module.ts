import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OkolisPage } from './okolis.page';

const routes: Routes = [
  {
    path: '',
    component: OkolisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OkolisPageRoutingModule {}
