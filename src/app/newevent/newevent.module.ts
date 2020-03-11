import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeweventPageRoutingModule } from './newevent-routing.module';

import { NeweventPage } from './newevent.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeweventPageRoutingModule,
    HttpClientModule
  ],
  providers:[HttpClient],
  declarations: [NeweventPage]
})
export class NeweventPageModule {}
