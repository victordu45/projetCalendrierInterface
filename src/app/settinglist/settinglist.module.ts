import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettinglistPageRoutingModule } from './settinglist-routing.module';

import { SettinglistPage } from './settinglist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettinglistPageRoutingModule
  ],
  declarations: [SettinglistPage]
})
export class SettinglistPageModule {}
