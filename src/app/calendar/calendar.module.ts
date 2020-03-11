import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { CalendarModule } from 'ion2-calendar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    CalendarModule,
    HttpClientModule
  ],
  providers: [HttpClient, Clipboard, Toast],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
