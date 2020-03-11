import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHeaderResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

	constructor(private http: HttpClient) { }

	calendar = null;
	id = null;
	chat = "";
	chats;
	offsetMessage = -1;
	onChatKey(event) { this.chat = event.target.value; }
	uniqueID = localStorage.getItem('uniqueID');
	nombre = 0

	ngOnInit() {
		this.calendar = JSON.parse(localStorage.getItem('calendar'));
		this.id = "Chat de " + this.calendar['nomCalendrier'];
		this.getMessages();
		// setInterval(() => { 
		// 	this.myTimer(); // Now the "this" still references the component
		//  }, 1000);
		let chat = document.querySelector("ion-content");
		chat.scrollToBottom(1000);
	}

	loadData(event) {
		this.getMessages();
		setTimeout(() => {
			console.log('Done');
			event.target.complete();
			
			// App logic to determine if all data is loaded
			// and disable the infinite scroll
			//   if (data.length == 1000) {
			// 	event.target.disabled = true;
			//   }
		}, 500);
	}


	send() {
		let json = {
			uniqueID: localStorage.getItem('uniqueID'),
			contenu: this.chat,
			idCalendrier: this.calendar['idCalendrier']
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/createMessage', json, httpoption).subscribe(
			data => {
				this.getMessages();
				// let chat = document.querySelector("ion-content");
				// chat.scrollToBottom(3000);
			})
	}
	myTimer() {
		this.getMessages();
		// console.log("dans timer");
	}

	getMessages() {
		let json = {
			uniqueID: localStorage.getItem('uniqueID'),
			offset: this.offsetMessage,
			idCalendrier: this.calendar['idCalendrier']
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/getMessages', json, httpoption).subscribe(
			data => {
				// console.log(data);
				if (!('vide' in data)) {
					this.chats = [];
					for (let i in data) {
						let msg = data[i];
						this.offsetMessage = msg["offset"];

						if (msg['idUtilisateur'] == localStorage.getItem("uniqueID")) {
							msg['class'] = "own";
							msg['color'] = hexToRGB(msg['color'], 0.5);
						}
						else {
							// console.log("else else");
							msg['class'] = "other";
							msg['color'] = "rgb(241,239,240)";
						}
						this.chats.push(msg);
					}
				}
				else {
					console.log("pas de msg dans le chat");
				}

			})
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


