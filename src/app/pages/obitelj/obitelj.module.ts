import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObiteljPageRoutingModule } from './obitelj-routing.module';

import { ObiteljPage } from './obitelj.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObiteljPageRoutingModule
  ],
  declarations: [ObiteljPage]
})
export class ObiteljPageModule {}
