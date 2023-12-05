import {Injectable} from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  chat: {
    message: string
    author: string
  }[] = []

  constructor() {
    super({
      url: 'https://chat-socket-ode7.onrender.com/',
      options: {}
    })
  }

  socketOn() {
    this.on('chat', (s: any) => {
      this.chat = [...this.chat, s]
    })
  }

  sendMessage(msg: any) {
    this.emit('message', msg)
  }

}
