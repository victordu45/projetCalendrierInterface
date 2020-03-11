import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModifinfolistPageRoutingModule } from './modifinfolist-routing.module';

import { ModifinfolistPage } from './modifinfolist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifinfolistPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ModifinfolistPage],
  providers:[HttpClient]
})
export class ModifinfolistPageModule {}
