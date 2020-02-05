import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor() { }

  calendar = null;
  id = null;

  ngOnInit() {
    this.calendar = JSON.parse(localStorage.getItem('calendar'));
    this.id = "Chat de " + this.calendar['nomCalendrier']
  }

}
