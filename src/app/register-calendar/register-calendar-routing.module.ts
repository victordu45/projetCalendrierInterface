import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCalendarPage } from './register-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCalendarPageRoutingModule {}
