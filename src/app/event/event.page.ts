import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModifinfolistPageRoutingModule } from '../modifinfolist/modifinfolist-routing.module';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AjoutdepenseComponent } from '../ajoutdepense/ajoutdepense.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  constructor(public modalController: ModalController, private route: ActivatedRoute, private router: Router, public alertController: AlertController, private http: HttpClient) { }
  modal : any;
  data: any;
  condition = 0;
  errorMsg;
  currentModal : any;
  
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
    console.log(this.data["heureDebut"]);
  }
  modifier(){
    this.condition = 1;
  }
  cancel(){
    this.condition = 0;
  }

  valider(){
    let ion_datetime = document.querySelectorAll("ion-datetime");
    let ion_input = document.querySelectorAll("ion-input");
    let json = {
      nomEvenement : ion_input[0].value,
      description : ion_input[1].value,
      dateDebut : ion_datetime[0].value,
      heureDebut : ion_datetime[1].value,
      dateFin : ion_datetime[2].value,
      heureFin : ion_datetime[3].value,
      idEvent : this.data['idEvent']
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
    )
  }


  async ajouter() {
    this.modal = await this.modalController.create({
      component: AjoutdepenseComponent,
    });
    return await this.modal.present();
    this.currentModal = this.modal;
  }

  ionViewWillLeave() {
    console.log("Mettre l'alert ici")
  }
}
  
