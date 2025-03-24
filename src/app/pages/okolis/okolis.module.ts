import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OkolisPageRoutingModule } from './okolis-routing.module';

import { OkolisPage } from './okolis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OkolisPageRoutingModule
  ],
  declarations: [OkolisPage]
})
export class OkolisPageModule {}
