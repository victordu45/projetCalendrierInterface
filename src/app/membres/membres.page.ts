import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
	selector: 'app-membres',
	templateUrl: './membres.page.html',
	styleUrls: ['./membres.page.scss'],
})
export class MembresPage implements OnInit {

	constructor(private http: HttpClient, private router: Router) { }

	calendName = null;
	membres = [];

	memberWithWritable={}; 
	bool = null;

	ngOnInit() {
		let calendrier = JSON.parse(localStorage.getItem('calendar'))
		this.calendName = calendrier['idCalendrier']
	    console.log(calendrier)
    	let json1 = {
      		login : localStorage.getItem('uniqueID'),
      		idCal : this.calendName
    	}
    	let httpoption = {
      		headers: new HttpHeaders({
        	'Content-Type': 'application/json',
        	'Access-Control-Allow-Origin': '*'
      		})
    	};
    	this.http.post(environment.adressePython + '/isAdmin', json1, httpoption).subscribe(
			data => {
				this.bool = data['result'];
				console.log(this.bool);
      		})



		let json2 = {
			idCal : this.calendName
		}
		
		this.http.post(environment.adressePython + '/getMembersWritable', json2, httpoption).subscribe(
			data => {
				this.memberWithWritable = data;
				this.membres = Object.keys(data);
				console.log(this.membres)
				console.log(this.memberWithWritable)
			})
	}

	test(a){
		this.memberWithWritable[a]=!this.memberWithWritable[a];
	}

	valider(){
		console.log("valider");
		let json = {
			membres:this.memberWithWritable,
			idCal : this.calendName
	  	}
	  	let httpoption = {
			headers: new HttpHeaders({
	  		'Content-Type': 'application/json',
	  		'Access-Control-Allow-Origin': '*'
			})
		  };
		this.http.post(environment.adressePython + '/changeDroits', json, httpoption).subscribe(
			data => {
				if (data['result'] == 'added'){
					this.router.navigateByUrl('/calendar');
				}
      		})
	}
}

