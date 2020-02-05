import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembresPage } from './membres.page';

const routes: Routes = [
  {
    path: '',
    component: MembresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembresPageRoutingModule {}
