import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StanistePageRoutingModule } from './staniste-routing.module';

import { StanistePage } from './staniste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StanistePageRoutingModule
  ],
  declarations: [StanistePage]
})
export class StanistePageModule {}
