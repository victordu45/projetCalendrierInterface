import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private router: Router) { }

  redirect(nombre){
    if(nombre == 0){
      this.router.navigateByUrl('/infos');
    }
    else if(nombre == 1){
      this.router.navigateByUrl('/membres');
    }
  }

  logout() {
		localStorage.clear();
		this.router.navigateByUrl('/home');
	}

  ngOnInit() {
  }

}
