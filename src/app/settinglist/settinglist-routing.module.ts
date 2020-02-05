import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettinglistPage } from './settinglist.page';

const routes: Routes = [
  {
    path: '',
    component: SettinglistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettinglistPageRoutingModule {}
