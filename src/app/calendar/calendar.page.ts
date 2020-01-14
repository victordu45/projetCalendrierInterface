import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendarComponentOptions} from 'ion2-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  date: string;
  type: 'string';
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
   };

  eventSource = [];

  constructor(public alertController: AlertController) { }

  async presentAlertPrompt($event) {
    this.date = $event;
    let dateObject = new Date($event);


    console.log(new Date(this.date));
    
    var moisNumbers = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    
    let dateToday = dateObject.getFullYear() + "-" + moisNumbers[dateObject.getMonth()] + "-"+ dateObject.getDate()
    const alert = await this.alertController.create({
      header: dateToday,
      inputs: [
        {
          name: 'nameEvent',
          id: 'nameEvent',
          type: 'text',
          placeholder: "Nom de l'évènement"
        },
        {
          name: 'dateDebut',
          type: 'date',
          value: dateToday,
        },
        {
          name: 'heureDebut',
          type: 'time',
          value: '00:00',
        },
        {
          name: 'dateFin',
          type: 'date',
          value: dateToday,
        },
        {
          name: 'heureFin',
          type: 'time',
          value: '00:00',
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ],
      cssClass:"alertEvent"
    });

    
    await alert.present();
  }


  ngOnInit() {
  }

}
