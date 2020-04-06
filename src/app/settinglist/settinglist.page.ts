import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settinglist',
  templateUrl: './settinglist.page.html',
  styleUrls: ['./settinglist.page.scss'],
})
export class SettinglistPage implements OnInit {

  constructor(private router: Router) { }
  
  logout() {
		localStorage.clear();
		this.router.navigateByUrl('/home');
	}

  redirect(){
    this.router.navigateByUrl('/infolist');
  }


  ngOnInit() {
  }

}
