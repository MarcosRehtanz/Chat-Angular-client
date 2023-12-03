import { EventEmitter, Injectable, NgModule, Output } from '@angular/core';
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
      url: 'http://localhost:3000',
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
