import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  settings = null;
  
  constructor() {}

  ngOnInit(){
    console.log("test");
    this.settings = {
      container: document.getElementsByClassName('calendar'),
      calendar: document.getElementsByClassName('front'),
      days: document.getElementsByClassName('weeks span'),
      form: document.getElementsByClassName('back'),
      input: document.getElementsByClassName('back input'),
      buttons: document.getElementsByClassName('back button')
    };
    console.log("taille :"+this.settings.days.length);
    this.bindUIActions();
  }
  
  swap(currentSide, desiredSide){
    this.settings.container[0].classList.toggle('flip');
  
    currentSide.fadeOut(900);
    currentSide.hide();

    desiredSide.show();
  }

  bindUIActions(){
    
    for (var i=0; i < this.settings.days.length; i++) {
      console.log("test2");
        this.settings.days[i].addEventListener('click', function(){
          console.log("Finaly!");
      })
   }
/*    this.settings.days.on('click', function(){
      console.log("test");
      this.swap(this.settings.calendar, this.settings.form);
      this.settings.input.focus();
    });

    this.settings.buttons.on('click', function(){
      this.swap(this.settings.form, this.settings.calendar);
    });
  */  }

 
}