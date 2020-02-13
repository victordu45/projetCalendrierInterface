import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { MembresPageRoutingModule } from './membres-routing.module';

import { MembresPage } from './membres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembresPageRoutingModule,
    HttpClientModule
  ],
  declarations: [MembresPage],
  providers:[HttpClient]
})
export class MembresPageModule {}
