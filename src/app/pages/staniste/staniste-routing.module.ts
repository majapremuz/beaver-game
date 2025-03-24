import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StanistePage } from './staniste.page';

const routes: Routes = [
  {
    path: '',
    component: StanistePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StanistePageRoutingModule {}
