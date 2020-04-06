import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-newevent',
	templateUrl: './newevent.page.html',
	styleUrls: ['./newevent.page.scss'],
})
export class NeweventPage implements OnInit {

	constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,public alertController: AlertController) { }
	data: any;
	date = null;
	annee = null;
	mois = null;
	jour = null;
	calendar = null;
	errorMsg = null;
	ngOnInit() {
		this.calendar = JSON.parse(localStorage.getItem('calendar'));
		this.route.queryParams.subscribe(params => {
			if (params && params.special) {
				this.data = JSON.parse(params.special);
				console.log("reçu", this.data);
				let dateRecu = new Date(this.data);
				let tabDate = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
				this.date = dateRecu.getFullYear() + "-" + tabDate[dateRecu.getMonth()] + "-" + dateRecu.getDate();
			}
		});

	}
	valider() {
		let ion_datetime = document.querySelectorAll("ion-datetime");
		let ion_input = document.querySelectorAll("ion-input");
		console.log(ion_datetime[0].value);
		console.log(ion_datetime[2].value);
		let json = {
			uniqueID: localStorage.getItem('uniqueID'),
			idCalendar: this.calendar['idCalendrier'],
			nom: ion_input[0].value,
			dateDebut: ion_datetime[0].value,
			heureDebut: ion_datetime[1].value,
			dateFin: ion_datetime[2].value,
			heureFin: ion_datetime[3].value,
			description: ion_input[1].value
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/addNewEvent', json, httpoption).subscribe(
			data => {
				console.log(data);
				if (data['result'] == "added") {
					this.router.navigate(["calendar"]);
				}
				else {
					this.presentAlert(data['result']);
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

}
