import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpClientModule, HttpHeaderResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-ajoutdepense',
	templateUrl: './ajoutdepense.component.html',
	styleUrls: ['./ajoutdepense.component.scss'],
})
export class AjoutdepenseComponent implements OnInit {

	constructor(private http: HttpClient, public modalController: ModalController, private route: ActivatedRoute, private router: Router) { }

	titre: string;
	montant: number;
	idEvenement: string;
	checked = [];
	membres = [];
	calendName: any;
	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			if (params && params.special) {
				let param = JSON.parse(params.special);
				this.idEvenement = param['idEvenement'];
				// console.log(this.idEvenement);
			}
		});
		this.checked = [true, false, true, false]
		let calendrier = JSON.parse(localStorage.getItem('calendar'))
		this.calendName = calendrier['idCalendrier']
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		let json2 = {
			idCal: this.calendName
		}
		this.http.post(environment.adressePython + '/getMembersWritable', json2, httpoption).subscribe(
			data => {
				console.log(data);
				let membre;
				for (let [name, permission] of Object.entries(data)) {
					console.log(name, permission);
					membre = { 'name': name, 'permission': permission };
				}
				this.membres.push(membre);
			})
	}

	dismiss() {
		// using the injected ModalController this page
		// can "dismiss" itself and optionally pass back data
		this.modalController.dismiss({
			'dismissed': true
		});
	}

	changeBox(boxChanged) {
		if (boxChanged.permission) {
			boxChanged.permission = false;
		}
		else {
			boxChanged.permission = true;
		}
	}
	check(cocher) {
		console.log("cocher click " + cocher);
		let checkbox = document.querySelectorAll("ion-checkbox");
		for (let i = 0; i < this.membres.length; i++) {
			if (cocher == 0) {
				this.membres[i]['permission'] = true;
				checkbox[i].checked = true;
			}
			else {
				this.membres[i]['permission'] = false;
				checkbox[i].checked = false;
			}
		}
		console.log(this.membres)
	}

	getFalseMembers() {
		let falseMembers = [];
		for (let i = 0; i < this.membres.length; i++) {
			if (!this.membres[i]['permission']) {
				falseMembers.push(this.membres[i]['name']);
			}
		}
		return falseMembers;
	}

	addDepense() {
		let json = {
			titre: this.titre,
			montant: this.montant,
			idEvenement: this.idEvenement,
			falseMembers: this.getFalseMembers()
		}
		console.log(json);
		let httpoption = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		// this.http.post(environment.adressePython + '/modifEvent', json, httpoption).subscribe(
		// 	data => {
		// 		console.log(data);
		// 	}
		// )
	}
}
