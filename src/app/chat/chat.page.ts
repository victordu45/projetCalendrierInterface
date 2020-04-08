import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonContent } from '@ionic/angular';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: ['./chat.page.scss'],
})


export class ChatPage implements OnInit {



	titrePageMessage = '';
	message = '';
	messages = [];
	room = `room1`;
	user = '';
	calendar: any;


	//content pour faire le scroll
	@ViewChild(IonContent, { static: true }) content: IonContent;

	//initialisation du pointeur à récupérer les 15 premiers messages
	pointeurMessagesRecuperation = 15;


	isConnected = true;
	constructor(private socket: Socket, private toastCtrl: ToastController, private http: HttpClient) {
	}

	ngOnInit() {
		console.log("demarrage du socket")


		this.user = localStorage.getItem('uniqueID');

		this.socket.connect();
		this.calendar = JSON.parse(localStorage.getItem('calendar'));
		console.log(this.calendar)
		this.room = this.calendar.idCalendrier;


		console.log("nom user", this.user)
		this.socket.emit('join', { "username": this.user, "room": this.room });

		this.socket.fromEvent('users-changed').subscribe(data => {
			let user = data['user'];
			if (data['event'] === 'left') {
				this.showToast('User left: ' + user);
			} else {
				this.showToast('User joined: ' + user);
			}
		});

		this.socket.fromEvent('message').subscribe(message => {
			this.messages.push(message);
			this.pointeurMessagesRecuperation += 1;
			console.log(this.messages);
			setTimeout(() => {
				this.scrollToBottom();
			}, 100);
		});


		this.getMessages(this.pointeurMessagesRecuperation)

	}

	doRefresh(event) {
		console.log('Begin async operation');

		this.pointeurMessagesRecuperation += 15;
		this.getMessages(this.pointeurMessagesRecuperation)

		setTimeout(() => {
			console.log('Async operation has ended');
			event.target.complete();
		}, 2000);
	}


	scrollToBottom() {
		this.content.scrollToBottom(400);
	}


	sendMessage() {
		this.socket.emit('message', { msg: this.message, user: this.user, room: this.room });
		this.message = '';
	}

	ionViewDidEnter() {
		//définition des paramêtres 
		this.socket.connect()
		this.socket.emit('join', { "username": this.user, "room": this.room });
		this.isConnected = true;

	}

	ionViewDidLeave() {
		this.socket.emit('left', { "username": this.user, "room": this.room });
		this.socket.disconnect();
		console.log("on quitte la page 1")
		this.isConnected = false;
	}

	getMessages(i) {
		//récupération des 10messages suivants l'indice i, en effectuant une requête au serveur REST
		let json = {
			idCalendrier: this.calendar.idCalendrier,
			offset: i
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/getMessages', json, httpoption).subscribe(
			data => {
				let arrayMessage = data as Array<{}>
				// arrayMessage.forEach(msg => { 
				// 	this.messages.push(msg)})
				this.messages = arrayMessage.concat(this.messages)


				if (this.pointeurMessagesRecuperation == 15) {
					setTimeout(() => {
						this.scrollToBottom();
					}, 100);
				}
			});
	}

	async showToast(msg) {
		let toast = await this.toastCtrl.create({
			message: msg,
			position: 'top',
			duration: 1000
		});
		toast.present();
	}
	hexToRGB(hex, alpha) {
		var r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

		if (alpha) {
			return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
		} else {
			return "rgb(" + r + ", " + g + ", " + b + ")";
		}
	}
}



