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
	currency = "cad";
	checked = [];
	membres = [];
	cocher = 1;
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
				// console.log(data);
				let membre;
				for (let [name, permission] of Object.entries(data)) {
					// console.log(name, permission);
					membre = { 'name': name, 'permission': permission };
					this.membres.push(membre);
				}
				
				

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
		this.onChangeAmount();
		// console.log(this.membres);
	}
	check() {	
		console.log("MONTANT : " + this.montant);
		let checkbox = document.querySelectorAll("#listeMembresParticipants ion-checkbox");
		for (let i = 0; i < this.membres.length; i++) {
			let mbr = this.membres[i];
			if (this.cocher == 0) {		
				this.membres[i]['permission'] = false;
				checkbox[i].setAttribute("checked", "true");
			}
			else {	
				this.membres[i]['permission'] = true;
				checkbox[i].setAttribute("checked", "false");
				// mbr['permission'] = "true";
			}
		}
		if (this.cocher == 0) {
			this.cocher = 1;
		}
		else {
			this.cocher = 0;
		}
	}

	onChangeCurrency() {
		let currency = document.querySelectorAll("#listeMembresParticipants .membre .currency");
		for(let i = 0 ; i < currency.length ; i++) { // on boucle parmis toutes les checkbox et on vérifie ceux qui sont TRUE pour leur assigner la valeur, et 0 à ceux FALSE
			currency[i].innerHTML = this.currency;
			console.log(this.currency);
		}
	}

	onChangeAmount() {
		let checkbox = document.querySelectorAll("#listeMembresParticipants .membre ion-checkbox");
		let nbParticipants = this.getTrueMembers().length;
		for(let i = 0 ; i < checkbox.length ; i++) { // on boucle parmis toutes les checkbox et on vérifie ceux qui sont TRUE pour leur assigner la valeur, et 0 à ceux FALSE
			let amount = checkbox[i].parentElement.children[2].children[0];
			if(checkbox[i].checked) {
				amount.innerHTML = "" + (this.montant / nbParticipants).toFixed(2); // 2 nb après la virgule
				this.membres[i]['amount'] = (this.montant / nbParticipants).toFixed(2); // on ajoute une valeur à notre tableau d'objet -> le montant que chacun doit payer
			}
			else {
				amount.innerHTML = "0";
				this.membres[i]['amount'] = 0; 
			}
		}
		// console.log(this.membres);
	}
	getTrueMembers() {
		let trueMembers = [];
		for (let i = 0; i < this.membres.length; i++) {
			if (this.membres[i]['permission']) {
				trueMembers.push(this.membres[i]['name']);
			}
		}
		return trueMembers;
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
		if(this.montant != undefined) {
			let json = {
				titre: this.titre,
				montant: this.montant,
				idEvenement: this.idEvenement,
				currency: this.currency,
				allMembers: this.membres
			}
			console.log(json);
			let httpoption = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				})
			};
		}
		
		// this.http.post(environment.adressePython + '/modifEvent', json, httpoption).subscribe(
		// 	data => {
		// 		console.log(data);
		// 	}
		// )
	}
}
