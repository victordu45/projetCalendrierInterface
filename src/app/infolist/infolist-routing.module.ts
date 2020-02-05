import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfolistPage } from './infolist.page';

const routes: Routes = [
  {
    path: '',
    component: InfolistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfolistPageRoutingModule {}
