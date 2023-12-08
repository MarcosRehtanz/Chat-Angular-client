import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';


interface Chat {
  message: string
  author: string
}[]
@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  chat: Chat[] = []

  nameChat$: Observable<string>
  constructor(
    private store: Store<{ chat: Room }>
  ) {
    super({
      url: 'https://chat-socket-ode7.onrender.com/',
      options: {}
    })
    this.nameChat$ = store.select(({ chat }) => chat.name)
  }

  socketOn() {
    this.on('chat', (s: any) => {
      this.chat = [...this.chat, s]
    })
  }

  sendMessage(msg: Chat) {
    this.nameChat$.subscribe(s => {
      this.emit('message', {...msg, message: s + msg.message})
    })
  }

}
