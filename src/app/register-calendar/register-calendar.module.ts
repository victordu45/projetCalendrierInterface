import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { RegisterCalendarPageRoutingModule } from './register-calendar-routing.module';

import { RegisterCalendarPage } from './register-calendar.page';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCalendarPageRoutingModule,
    ColorPickerModule,
    HttpClientModule
  ],
  declarations: [RegisterCalendarPage],
  providers:[HttpClient]
})
export class RegisterCalendarPageModule {}
