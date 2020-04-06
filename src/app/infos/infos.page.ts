import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHeaderResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.page.html',
  styleUrls: ['./infos.page.scss'],
})
export class InfosPage implements OnInit {

  constructor(private http: HttpClient) { }

  calendName = null;
  admin = null;
  nombre = null;

  ngOnInit() {
    let calendrier= JSON.parse(localStorage.getItem('calendar'))
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
    this.http.post(environment.adressePython + '/getInfos', json, httpoption).subscribe(
			data => {
        this.admin = data['admin'];
        this.nombre = data['nombre'];
      })
    }
  }
