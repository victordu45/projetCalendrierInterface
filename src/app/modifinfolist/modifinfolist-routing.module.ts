import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifinfolistPage } from './modifinfolist.page';

const routes: Routes = [
  {
    path: '',
    component: ModifinfolistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifinfolistPageRoutingModule {}
