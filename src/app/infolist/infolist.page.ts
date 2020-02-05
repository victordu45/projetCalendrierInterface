import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHeaderResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-infolist',
  templateUrl: './infolist.page.html',
  styleUrls: ['./infolist.page.scss'],
})
export class InfolistPage implements OnInit {

  constructor(private http: HttpClient) { }

  login = null;
  email = null;
  nom = null;
  prenom = null;

  ngOnInit() {
    let json = {
      uniqueID: localStorage.getItem('uniqueID')
    }
    let httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    this.http.post(environment.adressePython + '/getProfil', json, httpoption).subscribe(
			data => {
        this.login = data['login'],
        this.email = data['email'],
        this.nom = data['nom'],
        this.prenom = data['prenom']
      })
  } 
}
