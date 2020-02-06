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
  onChatKey(event) { this.chat = event.target.value; }
  uniqueID = localStorage.getItem('uniqueID');


	ngOnInit() {
		this.calendar = JSON.parse(localStorage.getItem('calendar'));
		this.id = "Chat de " + this.calendar['nomCalendrier'];
		this.getMessages();
		setInterval(() => { 
			this.myTimer(); // Now the "this" still references the component
		 }, 1000);
		let chat = document.querySelector("ion-content");
		chat.scrollToBottom(300);
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
				let chat = document.querySelector("ion-content");
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
						
						if(msg['idUtilisateur'] == localStorage.getItem("uniqueID")) {
							msg['class'] = "own";
							msg['color'] = hexToRGB(msg['color'],0.5);
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
  

