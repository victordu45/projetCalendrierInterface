import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembresPageRoutingModule } from './membres-routing.module';

import { MembresPage } from './membres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembresPageRoutingModule
  ],
  declarations: [MembresPage]
})
export class MembresPageModule {}
