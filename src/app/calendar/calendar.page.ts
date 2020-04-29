import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendarComponentOptions, CalendarModalOptions, CalendarModal } from 'ion2-calendar';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHeaderResponse } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CalendarController } from 'ion2-calendar';
import { ModalController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { MenuController } from '@ionic/angular';


@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.page.html',
	styleUrls: ['./calendar.page.scss'],

})

export class CalendarPage implements OnInit {
	date: string;
	type: 'string';
	day;
	personalAmount = 0;
	totalAmount = 0;
	evenements;
	eventSource = [];
	constructor(private menu: MenuController, private toast: Toast, private clipboard: Clipboard, public modalCtrl: ModalController, private route: ActivatedRoute, public alertController: AlertController, private http: HttpClient, private router: Router, public calendarCtrl: CalendarController) { }
	errorMsg = "";
	calendar;
	nombre = 0;
	adressePython: 'http://192.168.0.120:5000';



	optionsMulti: CalendarComponentOptions = {
		pickMode: 'single',
		daysConfig: [],
	};

	ngOnInit() {

		

		this.calendar = JSON.parse(localStorage.getItem('calendar'));
		let couleur = localStorage.getItem('couleurTheme');
		console.log("ID CALENDAR : " + this.calendar['idCalendrier']);
		this.daysConfig();
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
		this.route.queryParams.subscribe(params => {
			if (params && params.refresh) {
				console.log(params);
				this.getEventFromDay();
			}
		});

		this.http.post(environment.adressePython + '/getEventsFromPersonalCalendar', json, httpoption).subscribe(
			data => {
				if (!('vide' in data)) {
					this.evenements = [];
					for (let i in data) {
						let evenement = data[i];
						evenement['couleurThemeRgba'] = hexToRGB(evenement['couleurTheme'], 0.2);
						evenement['couleurTheme'] = "5px solid " + evenement['couleurTheme'];
						let debut = evenement['dateDebut'];
						let fin = evenement['dateFin'];
						evenement['heureDebut'] = debut.split(' ')[1]
						evenement['heureFin'] = fin.split(' ')[1];
						evenement['dateDebut'] = debut.split(' ')[0]
						evenement['dateFin'] = fin.split(' ')[0]
						
						this.evenements.push(evenement);
					}
					// this.optionsMulti.daysConfig = this.daysConfig();
				}
				else {
					console.log(data);
				}

			}

		)
		this.http.post(environment.adressePython + '/getPersonalAmountTransaction', json, httpoption).subscribe(
			data => {
				console.log(data);
				if (('amount' in data)) this.personalAmount = data['amount'];

			}

		)
		this.http.post(environment.adressePython + '/getTotalAmountTransactionCalendar', json, httpoption).subscribe(
			data => {
				console.log(data);
				if (('amount' in data)) this.totalAmount = data['amount'];
			}

		)

		let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		let buttonAddEvent: HTMLElement = document.querySelector(".addEvent") as HTMLElement;
		buttonAddEvent.onmousedown = dragMouseDown;
		buttonAddEvent.ontouchstart = dragMouseDown;
		let x_begin, y_begin, x_end, y_end;
		// buttonAddEvent.style.left = "50%";
		// buttonAddEvent.style.bottom = "10px";
		function dragMouseDown(e) {

			e = e || window.event;
			// e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			x_begin = pos3; // va servir au petit jeu 
			y_begin = pos4; // va servir au petit jeu
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

		function closeDragElement(e) {
			// stop moving when mouse button is released:
			// alert("ok");
			// e = e || window.event;
			// // e.preventDefault();
			// // alert(e.touches[0].pageX);
			// // let clientX = e.clientX;
			// // let clientY = e.clientY;
			// // if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
			// 	let clientX = e.targetTouches[0].clientX;
			// 	let clientY = e.pageY;
			// // }
			// x_end = clientX;
			// y_end = clientY;
			// let Xdiff = Math.abs(x_begin - x_end);
			// let Ydiff = Math.abs(y_begin - y_end);
			// // alert("x_begin : " + x_begin  +  " , y_begin : " + y_begin + " x_end " + x_end + " y_end " + y_end +  " Xdiff " + Xdiff + " Ydiff" + Ydiff);
			// if(y_begin < y_end) {
			// 	buttonAddEvent.style.top = (buttonAddEvent.offsetTop - pos2) + (Ydiff *2) +  "px";
			// }
			// else {
			// 	buttonAddEvent.style.top = (buttonAddEvent.offsetTop - pos2) - (Ydiff *2) +  "px";
			// }
			// if(x_begin < x_end) {
			// 	buttonAddEvent.style.left = (buttonAddEvent.offsetLeft - pos1) + (Ydiff*2) +"px";
			// }
			// else {
			// 	buttonAddEvent.style.left = (buttonAddEvent.offsetLeft - pos1) - (Ydiff*2) +"px";
			// }
			// buttonAddEvent.style.top = (buttonAddEvent.offsetTop - pos2) + "px";
			// buttonAddEvent.style.left = (buttonAddEvent.offsetLeft - pos1) +"px";
			document.onmouseup = null;
			document.ontouchend = null;
			document.onmousemove = null;
			document.ontouchmove = null;
		}
	}
	
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
								__daysConfig.push(
									{
										date: new Date(dateDebut.getFullYear(), dateDebut.getMonth(), dateDebut.getDate()),
										subTitle: '+',
										marked: true
									}
								)
							}
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

	test(i) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				special: JSON.stringify(i)
			}
		};
		this.router.navigate(["/event"], navigationExtras);
	}

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

	redirect() {
		var varEvent = document.querySelector('ion-fab-button');
		let event = varEvent.getAttribute('value');
		var date = event;
		console.log("envoyé", event);
		let navigationExtras: NavigationExtras = {
			queryParams: {
				special: JSON.stringify(event)
			}
		};
		this.router.navigate(["/newevent"], navigationExtras);
	}

	changeValue(event) {
		var varEvent = document.querySelector('ion-fab-button');
		var jourNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
		var moisNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
		varEvent.setAttribute('value', event);
		let theDay = new Date(Date.parse(event._d));
		this.day = theDay.getFullYear() + "-" + moisNumbers[theDay.getMonth()] + "-" + jourNumbers[theDay.getUTCDate()];
		console.log(event, this.day);
		let couleurTheme = localStorage.getItem("couleurTheme");
		this.getEventFromDay();
	}
	getEventFromDay() {
		let json = {
			uniqueID: localStorage.getItem('uniqueID'),
			idCalendar: this.calendar['idCalendrier'],
			aDay: this.day
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};

		this.http.post(environment.adressePython + '/getEventsFromDay', json, httpoption).subscribe(
			data => {
				if (!('vide' in data)) {
					this.evenements = [];
					for (let i in data) {
						let evenement = data[i];
						console.log(evenement);
						evenement['couleurThemeRgba'] = hexToRGB(evenement['couleurTheme'], 0.2);
						evenement['couleurTheme'] = "5px solid " + evenement['couleurTheme'];
						let debut = evenement['dateDebut'];
						let fin = evenement['dateFin'];
						evenement['heureDebut'] = debut.split(' ')[1]
						evenement['heureFin'] = fin.split(' ')[1];
						evenement['dateDebut'] = debut.split(' ')[0];
						evenement['dateFin'] = fin.split(' ')[0];
						this.evenements.push(evenement);
					}
					// this.optionsMulti.daysConfig = this.daysConfig();
				}
				else {
					this.evenements = [];
					console.log(data);
				}

			}
		)

	}

	/*async presentAlertPrompt() {
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
	}*/

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

