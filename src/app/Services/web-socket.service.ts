import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

// import { Room } from '../models/room.model';
// import { Message } from '../models/message.model'
import { Room, Message, ChatRoom } from '../models'
import { addChat } from '../store/rooms/rooms.action';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  chat: Message[] = []
  chat$: Observable<ChatRoom>
  constructor(
    private store: Store<{ chat: ChatRoom }>
  ) {
    super({
      url: 'https://chat-socket-ode7.onrender.com/',
      // url: 'http://localhost:3000/',
      options: {}
    })
    this.chat$ = store.select('chat')
  }

  socketOn() {
    this.on('chat', (message: Message) => {
      this.chat = [...this.chat, message]
    })
  }

  connectToRoom(idRoom: string) {
    this.emit('connectToRoom', idRoom)
  }

  sendMessage(msg: Message) {
    this.emit('message', msg)
  }
}
