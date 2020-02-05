import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfolistPageRoutingModule } from './infolist-routing.module';
import { InfolistPage } from './infolist.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfolistPageRoutingModule,
    HttpClientModule
  ],
  declarations: [InfolistPage],
  providers:[HttpClient]
})
export class InfolistPageModule {}
