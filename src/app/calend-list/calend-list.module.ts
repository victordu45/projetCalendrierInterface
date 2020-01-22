import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendListPageRoutingModule } from './calend-list-routing.module';

import { CalendListPage } from './calend-list.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendListPageRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  declarations: [CalendListPage]
})
export class CalendListPageModule {}
