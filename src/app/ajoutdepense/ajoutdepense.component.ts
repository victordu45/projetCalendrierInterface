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
	advanced = 0;
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
		let calendrier = JSON.parse(localStorage.getItem('calendar'));
		this.calendName = calendrier['idCalendrier'];
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
		if(this.advanced == 0) { // ONPEUT COCHER OU DECOCHER TOUT LE MONDE UNIQUEMENT QUAND LE MODE AVANCE NEST PAS ACTIF => PAS DE MOFICIATION MANUEL DE PRIX
			// console.log("________________check____________");
			// console.log("MONTANT : " + this.montant);
			let checkbox = document.querySelectorAll("#listeMembresParticipants ion-checkbox");
			for (let i = 0; i < this.membres.length; i++) {
				let mbr = this.membres[i];
				if (this.cocher == 0) {
					this.membres[i]['permission'] = false;
					checkbox[i].setAttribute("checked", "true");
					checkbox[i].setAttribute("aria-checked", "true");
				}
				else {
					this.membres[i]['permission'] = true;
					checkbox[i].setAttribute("checked", "false");
					checkbox[i].setAttribute("aria-checked", "false");
					// mbr['permission'] = "true";
				}
			}
			if (this.cocher == 0) {
				this.cocher = 1;
			}
			else {
				this.cocher = 0;
			}
			this.onChangeAmount();
			// console.log("___________//CHECK_____________");
		}
		
		
	}

	onChangeCurrency() {
		let currency = document.querySelectorAll("#listeMembresParticipants .membre .currency");
		for (let i = 0; i < currency.length; i++) { // on boucle parmis toutes les checkbox et on vérifie ceux qui sont TRUE pour leur assigner la valeur, et 0 à ceux FALSE
			currency[i].innerHTML = this.currency;
			// console.log(this.currency);
		}
	}

	onChangeAmount() {
		// console.log("______onChangeAmount()_______");
		let checkbox = document.querySelectorAll("#listeMembresParticipants .membre ion-checkbox");
		let nbParticipants = this.getTrueMembers().length;
		for (let i = 0; i < checkbox.length; i++) { // on boucle parmis toutes les checkbox et on vérifie ceux qui sont TRUE pour leur assigner la valeur, et 0 à ceux FALSE
			let amount = checkbox[i].parentElement.children[2].children[0];
			console.log("aria checked = " + checkbox[i].getAttribute("aria-checked"));
			if (checkbox[i].getAttribute("aria-checked") == "true") {
				amount.innerHTML = "" + (this.montant / nbParticipants).toFixed(2); // 2 nb après la virgule
				this.membres[i]['amount'] = (this.montant / nbParticipants).toFixed(2); // on ajoute une valeur à notre tableau d'objet -> le montant que chacun doit payer
			}
			else {
				amount.innerHTML = "0";
				this.membres[i]['amount'] = 0;
			}
		}
		// console.log("___________//onChangeAmount______________");
		// console.log(this.membres);
	}

	advancedMode() {
		// console.log("advancedmode");
		let amount = document.querySelectorAll("#listeMembresParticipants .membre .amount .price");
		// console.log(amount);
		if (this.montant != undefined) {
			for (let i = 0; i < amount.length; i++) {
				if (this.advanced == 0) {
					let inp = document.createElement("ion-input");
					inp.setAttribute("value", amount[i].innerHTML);
					inp.setAttribute("class", "");
					inp.setAttribute("type", "number");
					inp.setAttribute("modified", "false");
					inp.setAttribute("ionChange", "this.onChangeIndividualPrice()");
					amount[i].innerHTML = "";
					amount[i].appendChild(inp);
					// amount[i].appendChild(inp);
					// console.log("avant event : " + inp.value);
					amount[i].children[0].addEventListener('ionInput', (e: Event) => this.onChangeIndividualPrice(e));
					// console.log("onchange");
					// this.setAttribute("value", this.value);
					// let individualInputs = document.querySelectorAll("#listeMembresParticipants .membre .amount .price ion-input");
					// console.log(individualInputs);
					// console.log(this.value);

					// console.log(amount[i].children[0]);
				}
				else {
					// console.log("VALUE : " + amount[i].children[0].value);
					// console.log("VALUE .getAttribute : " + amount[i].children[0].getAttribute("value"));
					// console.log()
					amount[i].innerHTML = amount[i].children[0].getAttribute("value");
				}
			}
			// ON BLOQUE LE BOUTON DU CHECK ALL 
			let checkAll = document.querySelectorAll("ion-checkbox");
			if (this.advanced == 0) {
				this.advanced = 1;
				for(let i = 0 ; i < checkAll.length ; i++) {
					checkAll[i].setAttribute("disabled","true");
				}
				
			}
			else {
				this.advanced = 0;
				for(let i = 0 ; i < checkAll.length ; i++) {
					checkAll[i].setAttribute("disabled","false");
				}
			}
			
		}
	}
	onChangeIndividualPrice(e) {
		// console.log("test");
		// console.log(e);
		// console.log("_______onChangeIndividualPrice________");
		// console.log("VALEUR = " + e.detail['value']);
		let nbParticipants = this.getTrueMembers().length;
		let amountMax = this.montant / nbParticipants;
		console.log("MAX = " + amountMax);
		if (e.detail['value'] > this.montant) {
			console.log("lolol");
			e.target.value = amountMax;
			e.target.setAttribute("value",amountMax);
			e.target.setAttribute("modified", "true");
		}
		else {
			e.target.setAttribute("modified", "true");
			e.target.setAttribute("value",e.target.value);

		}
		this.equilibrage(e.target.value);
		// console.log("_______END________");
	}

	equilibrage(current) {

		let inputsNonModifies = document.querySelectorAll("#listeMembresParticipants .membre .amount .price ion-input[modified=false]");
		let inputsModifies = document.querySelectorAll("#listeMembresParticipants .membre .amount .price ion-input[modified=true]");
		console.log("NON MODIFIES");
		console.log(inputsNonModifies);
		console.log(inputsModifies);
		let montantTotalModifie = 0;

		let checkbox = document.querySelectorAll("#listeMembresParticipants .membre ion-checkbox");

		for (let i = 0; i < inputsModifies.length; i++) {
			// console.log("MODIFIEEEE : " + inputsModifies[i].value);
			montantTotalModifie += parseFloat(inputsModifies[i].getAttribute("value"));
		}
		let compteurCocheEtNonModifie = 0;
		for (let i = 0; i < checkbox.length; i++) { // on COMPTE DABORD les checkbox non modifiés et cochés !
			let checkb = checkbox[i].parentElement.children[2].children[0];
			// console.log(checkb);
			// console.log(checkbox[i]);
			if (checkbox[i].getAttribute("aria-checked") && checkb.children[0].getAttribute("modified") == "false") {
				// console.log(checkb);
				compteurCocheEtNonModifie++;
			}
			// inputsNonModifies[i].value = ((this.montant - montantTotalModifie).toFixed(2)) / 
		}
		console.log(compteurCocheEtNonModifie);
		for (let i = 0; i < checkbox.length; i++) { // on balance les inputs non modifiés :) !
			let checkb = checkbox[i].parentElement.children[2].children[0];
			if (checkbox[i].getAttribute("aria-checked") == "true" && checkb.children[0].getAttribute("modified") == "false") {
				// console.log("LOO");
				// checkb.children[0].value = ((this.montant - montantTotalModifie) / compteurCocheEtNonModifie).toFixed(2);
				checkb.children[0].setAttribute("value",((this.montant - montantTotalModifie) / compteurCocheEtNonModifie).toFixed(2));
				// console.log(checkb);
			}

		}
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

	getAllPrices() {
		// fonction qui permet de faire le récap de toutes les transactions avant d'envoyer au serveur
		if (this.advanced == 0) {
			let mbr = document.querySelectorAll("#listeMembresParticipants .membre") ;
			for (let i = 0; i < mbr.length; i++) {
				let chec = mbr[i].children[0] as HTMLIonCheckboxElement;
				this.membres[i]['permission'] = chec.checked;
				this.membres[i]['amount'] = mbr[i].children[2].children[0].textContent;
			}
			console.log(this.membres);
		}
		else {
			alert("Please confirm modifications"); 
		}

	}

	addDepense() {
		this.getAllPrices();
		if (this.montant != undefined) {
			let json = {
				idUtilisateur: localStorage.getItem('uniqueID'),
				description: this.titre,
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

			
		this.http.post(environment.adressePython + '/newTransaction', json, httpoption).subscribe(
			data => {
				console.log(data);
			}
		)
		}

	}
}
