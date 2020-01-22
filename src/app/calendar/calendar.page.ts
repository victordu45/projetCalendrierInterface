import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendarComponentOptions, CalendarModalOptions, CalendarModal } from 'ion2-calendar';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CalendarController } from 'ion2-calendar';
import { ModalController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Toast } from '@ionic-native/toast/ngx';


@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.page.html',
	styleUrls: ['./calendar.page.scss'],
	
})

export class CalendarPage implements OnInit {
	date: string;
	type: 'string';

	evenements;
	eventSource = [];
	// CalendarComponentOptions: CalendarComponentOptions;
	// optionsMulti: any;
	// CalendarComponentOpt = new CalendarComponent();

	constructor(private toast: Toast, private clipboard: Clipboard, public modalCtrl: ModalController, private route: ActivatedRoute, public alertController: AlertController, private http: HttpClient, private router: Router, public calendarCtrl: CalendarController) { }

	errorMsg = "";
	calendar = null;

	

	optionsMulti: CalendarComponentOptions = {
		pickMode: 'single',
		daysConfig: [],
	};
	
	
	daysConfig() {
		console.log("debut");
		let __daysConfig = [];
		let json = {
			uniqueID: localStorage.getItem('uniqueID'),
			idCalendar: localStorage.getItem('idCalendrier')
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};

		this.http.post(environment.adressePython + '/getEventsFromPersonalCalendar', json, httpoption).subscribe(
			data => {
				if (!('vide' in data)) {
					this.evenements = [];
					for (let i in data) {
						let evenement = data[i];
						this.evenements.push(evenement);
						console.log("in daysConfigs");
						if (typeof this.evenements != "undefined") {
							// console.log(this.evenements.length);
							for (let i = 0; i < this.evenements.length; i++) {
								let evenement = this.evenements[i];
								let dateDebut = new Date(evenement['dateDebut']);
								// console.log("dans la boucle");
								// console.log(evenement);
								// console.log(dateDebut);
								// console.log(dateDebut.getFullYear(),dateDebut.getMonth(),dateDebut.getDate());
								__daysConfig.push(
									{
										date: new Date(dateDebut.getFullYear(), dateDebut.getMonth(), dateDebut.getDate()),
										subTitle: '+',
										marked: true
									}
								)
							}
							console.log("lalalalala");
							console.log(__daysConfig);
							// return __daysConfig;
						}
					}
					
				}
				else {
					console.log(data);
				}

			}

		)
		let _daysConfig = [
				{
					date: new Date(2020, 0, 19),
					// title: 'Test title',
					subTitle: '+',
					cssClass: 'my-cal',
					marked: true,
		
				}];
				console.log("dedans");
		this.optionsMulti.daysConfig = __daysConfig;
		// return _daysConfig;


	}
	






	// console.log(__daysConfig);
	// let _daysConfig = [
	// 	{
	// 		date: new Date(2020, 0, 19),
	// 		// title: 'Test title',
	// 		subTitle: '+',
	// 		cssClass: 'my-cal',
	// 		marked: true,

	// 	},
	// 	{
	// 		date: new Date(2020, 0, 21),
	// 		subTitle: '.',
	// 		disable: true,
	// 		marked: true
	// 	},
	// 	{
	// 		date: new Date(2020, 3, 1),
	// 		subTitle: 'April Fools',
	// 		marked: true
	// 	},
	// 	{
	// 		date: new Date(2020, 3, 7),
	// 		subTitle: 'World Health',
	// 		marked: true
	// 	},
	// 	{
	// 		date: new Date(2020, 4, 31),
	// 		subTitle: 'No-Smoking',
	// 		marked: true
	// 	},
	// 	{
	// 		date: new Date(2020, 5, 1),
	// 		subTitle: 'Children\'s',
	// 		marked: true
	// 	}
	// ];
	// console.log(_daysConfig);
	// return _daysConfig;
	// _daysConfig.push(...this.days);

	// let ionCalendar = document.querySelector("ion-calendar");
	// console.log(ionCalendar);
	// this.calendarCtrl.openCalendar({
	// 	from: new Date(2020, 0, 1),
	// 	to: new Date(2020, 11.1),
	// 	daysConfig: _daysConfig
	// })
	// 	.then((res: any) => { console.log(res) })
	// 	.catch(() => { })

	// sleep(2000);



	alertShare() {
		let json = {
			name: localStorage.getItem('uniqueID'),
			calendrier: this.calendar['idCalendrier']
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/generateToken', json, httpoption).subscribe(
			data => {
				console.log(data['token'])
				this.alertCoucou(data['token']);
			}
		)
	}

	async alertCoucou(any) {
		this.clipboard.copy(any);
		this.toast.show(`Copié`, '2000', 'center').subscribe(
			toast => {
				console.log(toast);
			}
		);
	}

	changeValue(event) {
		var varEvent = document.querySelector('ion-fab-button');
		varEvent.setAttribute('value', event);
		let couleurTheme = localStorage.getItem("couleurTheme");
		let json = {
			uniqueID: localStorage.getItem('uniqueID'),
			idCalendar: this.calendar['idCalendrier']
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};

		this.http.post(environment.adressePython + '/getEventsFromPersonalCalendar', json, httpoption).subscribe(
			data => {
				if (!('vide' in data)) {
					this.evenements = [];
					for (let i in data) {
						let evenement = data[i];
						evenement['couleurThemeRgba'] = hexToRGB(evenement['couleurTheme'], 0.2);
						evenement['couleurTheme'] = "5px solid " + evenement['couleurTheme'];
						let debut = new Date(evenement['dateDebut']);

						let fin = new Date(evenement['dateFin']);
						evenement['heureDebut'] = debut.getHours() + ":" + debut.getMinutes();
						evenement['heureFin'] = fin.getHours() + ":" + fin.getMinutes();
						evenement['dateFin'] = fin.getDate() + "/" + fin.getMonth() + "/" + fin.getFullYear();
						this.evenements.push(evenement);
						console.log(evenement);
					}
					// this.optionsMulti.daysConfig = this.daysConfig();
				}
				else {
					console.log(data);
				}

			}
		)
	}

	async presentAlertPrompt() {
		var varEvent = document.querySelector('ion-fab-button');
		let event = varEvent.getAttribute('value');
		var date = event;
		let dateObject = new Date(event);


		var jourNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
		var moisNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


		let dateToday = dateObject.getFullYear() + "-" + moisNumbers[dateObject.getMonth()] + "-" + jourNumbers[dateObject.getDate() - 1]
		let dateTodayLetter = dateObject.getFullYear() + "-" + months[dateObject.getMonth()] + "-" + jourNumbers[dateObject.getDate() - 1]
		const alert = await this.alertController.create({
			header: dateTodayLetter,
			inputs: [
				{
					name: 'nameEvent',
					id: 'nameEvent',
					type: 'text',
					placeholder: "Nom de l'évènement"
				},
				{
					name: 'dateDebut',
					type: 'date',
					value: dateToday,
				},
				{
					name: 'heureDebut',
					type: 'time',
					value: '00:00',
				},
				{
					name: 'dateFin',
					type: 'date',
					value: dateToday,
				},
				{
					name: 'heureFin',
					type: 'time',
					value: '00:00',
				},
				{
					name: 'description',
					type: 'text',
					placeholder: 'Description'
				}
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
						let json = {
							uniqueID: localStorage.getItem('uniqueID'),
							idCalendar: this.calendar['idCalendrier'],
							nom: data.nameEvent,
							dateDebut: data.dateDebut,
							heureDebut: data.heureDebut,
							dateFin: data.dateFin,
							heureFin: data.heureFin,
							description: data.description
						}
						let httpoption = {
							headers: new HttpHeaders({
								'Content-Type': 'application/json',
								'Access-Control-Allow-Origin': '*'
							})
						};
						this.http.post(environment.adressePython + '/addNewEvent', json, httpoption).subscribe(
							data => {
								if (data['result'] == "added") {
								}
								else {
									this.errorMsg = data['result'];
								}
							}
						)
					}
				}
			],
			cssClass: "alertEvent"
		});


		await alert.present();
	}

	logout() {
		localStorage.clear();
		this.router.navigateByUrl('/home');
	}

	ngOnInit() {
		this.daysConfig();
		var couleur = localStorage.getItem('couleurTheme');
		this.route.queryParams.subscribe(params => {
			this.calendar = JSON.parse(params["param"]);
			console.log(this.calendar['idCalendrier']);
		});
		localStorage.setItem('idCalendrier', this.calendar['idCalendrier']);
		let json = {
			uniqueID: localStorage.getItem('uniqueID'),
			idCalendar: this.calendar['idCalendrier']
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};

		this.http.post(environment.adressePython + '/getEventsFromPersonalCalendar', json, httpoption).subscribe(
			data => {
				if (!('vide' in data)) {
					this.evenements = [];
					for (let i in data) {
						let evenement = data[i];
						this.evenements.push(evenement);
					}
					// this.optionsMulti.daysConfig = this.daysConfig();
				}
				else {
					console.log(data);
				}

			}

		)

		let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		let buttonAddEvent = document.querySelector(".addEvent");
		buttonAddEvent.onmousedown = dragMouseDown;
		buttonAddEvent.ontouchstart = dragMouseDown;
		// buttonAddEvent.style.left = "50%";
		// buttonAddEvent.style.bottom = "10px";
		function dragMouseDown(e) {

			e = e || window.event;
			// e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
				pos3 = e.targetTouches[0].pageX;
				pos4 = e.targetTouches[0].pageY;
			}
			// pos3 = e.targetT?ouches;
			// alert();
			document.onmouseup = closeDragElement;
			document.ontouchend = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
			document.ontouchmove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			let clientX = e.clientX;
			let clientY = e.clientY;
			if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
				clientX = e.targetTouches[0].pageX;
				clientY = e.targetTouches[0].pageY;
			}
			pos1 = pos3 - clientX;
			pos2 = pos4 - clientY;
			pos3 = clientX;
			pos4 = clientY;
			// alert(clientX);
			// set the element's new position:
			// buttonAddEvent.removeProperty("left");
			// buttonAddEvent.removeProperty("bottom");
			buttonAddEvent.style.top = (buttonAddEvent.offsetTop - pos2) + "px";
			buttonAddEvent.style.left = (buttonAddEvent.offsetLeft - pos1) + "px";
		}

		function closeDragElement() {
			// stop moving when mouse button is released:
			document.onmouseup = null;
			document.ontouchend = null;
			document.onmousemove = null;
			document.ontouchmove = null;
		}
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

