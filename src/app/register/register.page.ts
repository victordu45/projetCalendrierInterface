import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

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
  errLogin = "";
  errMail = "";
  adresse = false;
  color = "";


	constructor(private http: HttpClient, private router: Router,public alertController: AlertController) { }

	onLoginKey(event) { this.login = event.target.value; }
	onPasswordKey(event) { this.password = event.target.value; }
	onPasswordConfirmKey(event) {
		if (this.password != event.target.value) {
			this.isConfirmed = true;
		}
		else {
			this.isConfirmed = false;
		};
	}
	onEmailKey(event) { this.mail = event.target.value; } //Voir pour faire une verification de la forme de l'email
	onNameKey(event) { this.name = event.target.value; }
	onSurnameKey(event) { this.surname = event.target.value; }

	cancel() {
		this.router.navigateByUrl('/home');
	}


	register() {
		let colorPicker = document.querySelector(".colorPicker");
		let hexColor = colorPicker.getAttribute("ng-reflect-color-picker");
		this.adresse = true;
		let json = {
			login: this.login,
			password: this.password,
			name: this.name,
			surname: this.surname,
			mail: this.mail,
			color: hexColor,
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/register', json, httpoption).subscribe(
			data => {
				console.log(data);
				if (data['result'] == "added") {
					this.router.navigateByUrl('/home');
				}
				else {
					this.presentAlert(data["erreur"]);
				}
			}
		)
	}
	async presentAlert(errorMessage) {
		const alert = await this.alertController.create({
		  header: 'Error',
		  message: errorMessage,
		  buttons: ['OK']
		});
	
		await alert.present();
	  }


	ngOnInit() {
		let colorPicker = document.querySelector(".colorPicker");
		colorPicker.addEventListener("click", function () {
			this.blur();
		});
	}

}
