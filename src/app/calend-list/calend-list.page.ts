import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calend-list',
  templateUrl: './calend-list.page.html',
  styleUrls: ['./calend-list.page.scss'],
})
export class CalendListPage implements OnInit {
  login=null;
  constructor(private router: Router) { }

  ngOnInit() {
     this.login = localStorage.getItem('login');
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }

}
