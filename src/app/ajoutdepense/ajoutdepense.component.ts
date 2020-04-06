import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient, public modalController: ModalController) { }
  
  titre:string;
  montant:number;
  checked = [];
  membres = [];
  calendName:any;
  ngOnInit() {
    this.checked=[true,false,true,false]
    let calendrier = JSON.parse(localStorage.getItem('calendar'))
		this.calendName = calendrier['idCalendrier']
    let httpoption = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        })
    };
		let json2 = {
			idCal : this.calendName
		}
		this.http.post(environment.adressePython + '/getMembersWritable', json2, httpoption).subscribe(
			data => {
				this.membres = Object.keys(data);
				console.log(this.membres)
			})
  }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  changeBox(boxChanged){
    console.log(boxChanged)
    
  }
  check(cocher){
    
      for(let i = 0; i<this.checked.length; i++){
        this.checked[i]= cocher?false:true; 
      }
      console.log(this.checked)
  }

  addDepense(){
    /*let json = {
      titre : this.titre,
      montant : this.montant

    }
    let httpoption = {
      headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};
    this.http.post(environment.adressePython+'/modifEvent', json, httpoption).subscribe(
      data=>{
          console.log(data);
        }
    )*/
  }
}
