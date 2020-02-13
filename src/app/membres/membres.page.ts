import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHeaderResponse } from '@angular/common/http';

@Component({
	selector: 'app-membres',
	templateUrl: './membres.page.html',
	styleUrls: ['./membres.page.scss'],
})
export class MembresPage implements OnInit {

	constructor(private http: HttpClient) { }

	calendName = null;
	membres = [];
	condition = 0;

	ngOnInit() {
		let calendrier = JSON.parse(localStorage.getItem('calendar'))
		this.calendName = calendrier['idCalendrier']
		console.log(calendrier)
		let json = {
			idCal: calendrier['idCalendrier']
		}
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		this.http.post(environment.adressePython + '/getMembers', json, httpoption).subscribe(
			data => {
				if (!('vide' in data)) {

					for (let i in data) {
						let membre = data[i];
						this.membres.push(membre);
					}
				}
				else {
					console.log("pas de msg dans le chat");
				}
			})
	}
}

