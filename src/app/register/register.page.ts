import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  login = "";
  password = "";
  isConfirmed = false;
  name = "";
  surname = "";
  mail = "";
  gender = "";
  errorMsg = "";
  adresse = false;


  constructor(private http: HttpClient, private router: Router) { }

  onLoginKey(event) {this.login = event.target.value;}
  onPasswordKey(event) {this.password = event.target.value;}
  onPasswordConfirmKey(event) {
    if (this.password != event.target.value){
      this.isConfirmed = true;
    }
    else{
      this.isConfirmed = false;
    };
  }
  onEmailKey(event) {this.mail = event.target.value;} //Voir pour faire une verification de la forme de l'email
  onNameKey(event) {this.name = event.target.value;}
  onSurnameKey(event) {this.surname = event.target.value;}

  register() {
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (validateEmail(this.mail)) {
      this.adresse = false;
    } else {
      this.adresse = true;
    }

    /*if(this.adresse == true){
      let json = {
        login : this.login,
        password : this.password,
        name : this.name,
        surname : this.surname,
        mail : this.mail
      }
      let httpoption = {headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin':'*'
      })};
      this.http.post(environment.adressePython+'/register', json, httpoption).subscribe(
        data=>{
          console.log(data);
          if(data['result'] == "added"){
            this.router.navigateByUrl('/home');
          }
          else{
            this.errorMsg = data['result'];
          }
        }
      )
    }*/
  }



  ngOnInit() {
    
  }

}
