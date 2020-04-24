import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AjoutdepenseComponent } from '../ajoutdepense/ajoutdepense.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule,
    HttpClientModule,
  ],
  entryComponents:[
    AjoutdepenseComponent
  ],
  declarations: [EventPage,
  AjoutdepenseComponent],
  providers:[HttpClient]
})
export class EventPageModule {}
