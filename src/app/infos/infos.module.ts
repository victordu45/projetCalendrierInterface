import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfosPageRoutingModule } from './infos-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InfosPage } from './infos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [InfosPage],
  providers:[HttpClient]
})
export class InfosPageModule {}
