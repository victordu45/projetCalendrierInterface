import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user = '';

  password = '';

  errorMsg = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLoginKey(event) {this.user = event.target.value;}
  
  onPasswordKey(event) {this.password = event.target.value;}

  login() {
    let json = {
      user : this.user,
      password : this.password
    }
    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};
    this.http.post(environment.adressePython+'/login', json, httpoption).subscribe(
      data=>{
        console.log(data);
        if(data['result'] == "added"){
          localStorage.setItem('login', this.user);
          this.router.navigateByUrl('/calend-list');
        }
        else{
          this.errorMsg = data['result'];
        }
      }
    )
  }

  ngOnInit() {
    if(localStorage.getItem('login')){
      this.router.navigateByUrl('/calend-list');
    }
  }

}
