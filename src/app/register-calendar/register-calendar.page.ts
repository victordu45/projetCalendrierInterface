import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-register-calendar',
	templateUrl: './register-calendar.page.html',
	styleUrls: ['./register-calendar.page.scss'],
})
export class RegisterCalendarPage implements OnInit {

	constructor(private http: HttpClient, private router: Router) { }
  name = '';
  desc = '';
  errorMsg = '';
  
  
  onNameKey(event) {this.name = event.target.value;}
  onDescKey(event) {this.desc = event.target.value;}


	addCalendar() {
    let colorPicker = document.querySelector(".colorPicker");
    let hexColor = colorPicker.getAttribute("ng-reflect-color-picker");
		let json = {
      uniqueID : localStorage.getItem('uniqueID'),
      nom_calendrier : this.name,
      description : this.desc,
      couleurtheme : hexColor
    }
    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};
    this.http.post(environment.adressePython+'/addCalendar', json, httpoption).subscribe(
      data=>{
        console.log(data);
        if(data['result'] == "succes"){
          let navigationExtras: NavigationExtras = {
						queryParams: {
							refresh: true
						}
					};
          this.router.navigateByUrl('/calend-list',navigationExtras);
        }
        else{
          alert(data['error']);
        }
      }
    )
	}



	ngOnInit() {
		let colorPicker = document.querySelector(".colorPicker");
		colorPicker.addEventListener("click", function () {
			this.blur();
		});
	}

}
