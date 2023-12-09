import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../Services/web-socket.service';
import { faker } from '@faker-js/faker';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addChat, removeRoom } from '../../store/rooms/rooms.action';
import { useRoom } from '../../store/chat/chat.action';
import { ChatRoom } from '../../models';

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
  chat$: Observable<ChatRoom>
  rooms$: Observable<ChatRoom[]>
  // @Input() byId!: string 
  byId = ''
  rooms: ChatRoom[] = []

  constructor(
    private store: Store<{ rooms: ChatRoom[], chat: ChatRoom }>
  ) {
    this.rooms$ = store.select('rooms')
    this.name$ = store.select((state) => state.chat.name)
    this.room$ = store.select((state) => state.chat.room)
    this.id$ = store.select((state) => state.chat.id)
    this.chat$ = store.select('chat')
  }

  removeRoom() {
    const room = this.rooms.filter(r => r.id != this.byId)[0] || {
      chat: [],
      name: 'Sala General',
      room: 'angular',
      id: '',
    }

    this.store.dispatch(removeRoom({ byId: this.byId }))
    this.store.dispatch(useRoom({ room }))
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

  ngAfterViewInit() {
    this.socket.socketOn();
    this.rooms$.subscribe((rooms) => {
      this.rooms = rooms
    })
    this.chat$.subscribe(({ id: idRoom, chat }) => {

      this.store.dispatch(addChat({
        chat: [...this.socket.chat],
        byId: this.byId
      }))
      if (this.byId !== idRoom)
        this.socket.chat = chat;

      this.byId = idRoom
      this.socket.connectToRoom(idRoom)
    })
  }

}
