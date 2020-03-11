import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'calend-list',
    loadChildren: () => import('./calend-list/calend-list.module').then( m => m.CalendListPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'register-calendar',
    loadChildren: () => import('./register-calendar/register-calendar.module').then( m => m.RegisterCalendarPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'infos',
    loadChildren: () => import('./infos/infos.module').then( m => m.InfosPageModule)
  },
  {
    path: 'membres',
    loadChildren: () => import('./membres/membres.module').then( m => m.MembresPageModule)
  },
  {
    path: 'settinglist',
    loadChildren: () => import('./settinglist/settinglist.module').then( m => m.SettinglistPageModule)
  },
  {
    path: 'infolist',
    loadChildren: () => import('./infolist/infolist.module').then( m => m.InfolistPageModule)
  },
  {
    path: 'modifinfolist',
    loadChildren: () => import('./modifinfolist/modifinfolist.module').then( m => m.ModifinfolistPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'newevent',
    loadChildren: () => import('./newevent/newevent.module').then( m => m.NeweventPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
