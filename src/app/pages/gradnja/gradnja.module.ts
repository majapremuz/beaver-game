import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradnjaPageRoutingModule } from './gradnja-routing.module';

import { GradnjaPage } from './gradnja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradnjaPageRoutingModule
  ],
  declarations: [GradnjaPage]
})
export class GradnjaPageModule {}
