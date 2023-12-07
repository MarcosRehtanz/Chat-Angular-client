import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../Services/web-socket.service';
import { faker } from '@faker-js/faker';
import { Observable } from 'rxjs';
import { Room } from '../../models/room.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  name$: Observable<string>
  room$: Observable<string>
  id$: Observable<string>
  
  constructor(
    private store: Store<{chat: Room}>
  ){
    this.name$ = store.select((state)=> state.chat.name)
    this.room$ = store.select((state)=> state.chat.room)
    this.id$ = store.select((state)=> state.chat.id)
  }



  fullName = faker.person.fullName();

  socket = inject(WebSocketService)
  inputMessage = ''

  changeInputMessage(event: any) {
    if (event.code === "Enter") this.sendMessage()
    else this.inputMessage = event.target.value;
  }

  sendMessage() {
    if (this.inputMessage.trim().length) {
      this.socket.sendMessage({
        message: this.inputMessage,
        author: `${this.fullName}`,
      })
      this.inputMessage = ''
    }
  }

  socketHi() {
    this.socket.emit('hi')
  }

  @ViewChild('messages') messagesContent!: ElementRef<any>;

  ngAfterViewInit() {
    this.socket.socketOn();
  }

}
