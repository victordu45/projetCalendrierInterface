import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModifinfolistPageRoutingModule } from '../modifinfolist/modifinfolist-routing.module';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AjoutdepenseComponent } from '../ajoutdepense/ajoutdepense.component';


@Component({
	selector: 'app-event',
	templateUrl: './event.page.html',
	styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

	transactions;
	constructor(public modalController: ModalController, private route: ActivatedRoute, private router: Router, public alertController: AlertController, private http: HttpClient) { }
	modal: any;
	data: any;
	condition = 0;
	errorMsg;
	currentModal: any;
	

	ngOnInit() {
		this.transactions = [];
		this.route.queryParams.subscribe(params => {
			if (params && params.special) {
				this.data = JSON.parse(params.special);
			}
		});
		console.log(this.data["heureDebut"]);
		let json = {
			uniqueID: localStorage.getItem('uniqueID'),
			idCalendar: JSON.parse(localStorage.getItem('calendar'))['idCalendrier'],
			idEvenement: this.data['idEvenement']
		}
		console.log(json);
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/getTransactionsFromEvent', json, httpoption).subscribe(
			response => {
				// console.log(data);
				if (!('vide' in response)) {
					for(let i in response) {
						console.log(response);
						console.log(this.transactions);
						this.transactions.push(response[i]);
					}
				}
				
			}

		)
	}
	modifier() {
		this.condition = 1;
	}
	cancel() {
		this.condition = 0;
	}
	delete(i) {
		console.log("delete appuyé");

	}


	valider() {
		let ion_datetime = document.querySelectorAll("ion-datetime");
		let ion_input = document.querySelectorAll("ion-input");
		let json = {
			nomEvenement: ion_input[0].value,
			description: ion_input[1].value,
			dateDebut: ion_datetime[0].value,
			heureDebut: ion_datetime[1].value,
			dateFin: ion_datetime[2].value,
			heureFin: ion_datetime[3].value,
			idEvent: this.data['idEvent']
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/modifEvent', json, httpoption).subscribe(
			data => {
				console.log(data);
			}
		)
	}
	async presentAlertMultipleButtons() {
		const alert = await this.alertController.create({
			header: 'Delete event',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel: blah');
					}
				}, {
					text: 'DELETE',
					handler: () => {
						console.log('Confirm Okay');
						// console.log(this);
						let json = {
							idEvenement: this.data['idEvenement']
						}
						let httpoption = {
							headers: new HttpHeaders({
								'Content-Type': 'application/json',
								'Access-Control-Allow-Origin': '*'
							})
						};
						this.http.post(environment.adressePython + '/suppEvent', json, httpoption).subscribe(
							data => {
								console.log(data);
								if (('result' in data)) {
									if (data['result'] == "deleted") {
										this.router.navigateByUrl("/calendar");
									}
								}
							}
						)
					}
				}
			]
		});

		await alert.present();
	}
	back() {
		this.router.navigateByUrl("/calendar");
	}

	async ajouter() {
		this.modal = await this.modalController.create({
			component: AjoutdepenseComponent,
		});
		return await this.modal.present();
		this.currentModal = this.modal;
	}

	ionViewWillLeave() {
		console.log("Mettre l'alert ici")
	}
}

