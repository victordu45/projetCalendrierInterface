import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-calend-list',
	templateUrl: './calend-list.page.html',
	styleUrls: ['./calend-list.page.scss'],
})
export class CalendListPage implements OnInit {
	login = null;
	uniqueID = null;
	errorMsg = null;
	calendars = [];
	sharedCalendars = [];

	constructor(private router: Router, private navCtrl: NavController, private http: HttpClient, private alertController: AlertController,private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.login = localStorage.getItem('login');
		this.uniqueID = localStorage.getItem('uniqueID');
		this.route.queryParams.subscribe(params => {
			if (params && params.refresh) {
				console.log("on est dans le refresh");
				this.calendars = []
				this.sharedCalendars = []
				this.getPersonalCalendar();
				this.getSharedCalendars();
			}
		});

		this.getPersonalCalendar();
		this.getSharedCalendars();
	}


	getPersonalCalendar() {
		let json = {
			uniqueID: this.uniqueID
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/getPersonalCalendar', json, httpoption).subscribe(
			data => {
				// console.log(data);

				if (data[0].length != 0) {
					for (let i in data) {
						let calendrier = data[i];
						localStorage.setItem("couleurTheme", hexToRGB(calendrier['couleurTheme'], 0.2));
						// console.log(localStorage.getItem("couleurTheme"));
						// calendrier['couleurTheme'] = "background-color: " + calendrier['couleurTheme'];
						// console.log(calendrier);
						this.calendars.push(calendrier);
					}
					// console.log(data);

				}

				// else{
				// this.errorMsg = data['result'];
				// }
			}
		)
	}

	async popup() {
		const alert = await this.alertController.create({
			header: 'Join a calendar',
			inputs: [
				{
					name: 'link',
					type: 'text',
					placeholder: 'Your link !'
				},
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				}, {
					text: 'Ok',
					handler: data => {
						let lien = data.link;
						let json = {
							token: lien,
							uniqueID: localStorage.getItem('uniqueID')
						}
						let httpoption = {
							headers: new HttpHeaders({
								'Content-Type': 'application/json',
								'Access-Control-Allow-Origin': '*'
							})
						};
						this.http.post(environment.adressePython + '/verifToken', json, httpoption).subscribe(
							data => {
								console.log(data);
							}
						)
					}
				}
			]
		});

		await alert.present();
	}


	redirect(calendrier) {
		localStorage.setItem('calendar', JSON.stringify(calendrier));
		this.navCtrl.navigateForward(['calendar']);
	}

	getSharedCalendars() {
		let json = {
			uniqueID: this.uniqueID
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/getSharedCalendars', json, httpoption).subscribe(
			data => {
				if (!('vide' in data)) {
					for (let i in data) {
						let calendrier = data[i];
						this.sharedCalendars.push(calendrier);
					}
				}
			}
		)
	}



	logout() {
		localStorage.clear();
		this.router.navigateByUrl('/home');
	}

}
function hexToRGB(hex, alpha) {
	var r = parseInt(hex.slice(1, 3), 16),
		g = parseInt(hex.slice(3, 5), 16),
		b = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
		return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
	} else {
		return "rgb(" + r + ", " + g + ", " + b + ")";
	}
}

